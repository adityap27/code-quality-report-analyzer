import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'
import * as PIXI from 'pixi.js'
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur'
import { createNoise2D } from 'simplex-noise'
import hsl from 'hsl-to-hex'
import debounce from 'debounce'
import banner from '../../assets/images/banner.gif'
import './main.css'
import Navbar from '../navbar/Navbar'
import { OneCommitAnalysisContext } from '../../OneCommitAnalysisContext'

const Main = () => {
  const { setAnalysisData } = useContext(OneCommitAnalysisContext)
  const [repoLink, setRepoLink] = useState('')
  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [commits, setCommits] = useState([])
  const [selectedCommit, setSelectedCommit] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [flag, setFlag] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const styles = {
    backColor: 'grey',
  }
  useEffect(() => {
    function random(min, max) {
      return Math.random() * (max - min) + min
    }

    function map(n, start1, end1, start2, end2) {
      return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
    }

    const simplex = createNoise2D()

    class ColorPalette {
      constructor() {
        this.setColors()
        this.setCustomProperties()
      }

      setColors() {
        this.hue = ~~random(150, 190)
        this.complimentaryHue1 = this.hue + 70
        this.complimentaryHue2 = this.hue + 100
        this.saturation = 50
        this.lightness = 50
        this.baseColor = hsl(this.hue, this.saturation, this.lightness)
        this.complimentaryColor1 = hsl(
          this.complimentaryHue1,
          this.saturation,
          this.lightness
        )
        this.complimentaryColor2 = hsl(
          this.complimentaryHue2,
          this.saturation,
          this.lightness
        )
        this.colorChoices = [
          this.baseColor,
          this.complimentaryColor1,
          this.complimentaryColor2,
        ]
      }

      randomColor() {
        return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
          '#',
          '0x'
        )
      }

      setCustomProperties() {
        document.documentElement.style.setProperty('--hue', this.hue)
        document.documentElement.style.setProperty(
          '--hue-complimentary1',
          this.complimentaryHue1
        )
        document.documentElement.style.setProperty(
          '--hue-complimentary2',
          this.complimentaryHue2
        )
      }
    }

    class Orb {
      constructor(fill = 0x000000) {
        this.bounds = this.setBounds()
        this.x = random(this.bounds['x'].min, this.bounds['x'].max)
        this.y = random(this.bounds['y'].min, this.bounds['y'].max)
        this.scale = 1
        this.fill = fill
        this.radius = random(window.innerHeight / 6, window.innerHeight / 3)
        this.xOff = random(0, 1000)
        this.yOff = random(0, 1000)
        this.inc = 0.002
        this.graphics = new PIXI.Graphics()
        this.graphics.alpha = 0.825

        window.addEventListener(
          'resize',
          debounce(() => {
            this.bounds = this.setBounds()
          }, 250)
        )
      }

      setBounds() {
        const maxDist =
          window.innerWidth < 1000
            ? window.innerWidth / 3
            : window.innerWidth / 5
        const originX = window.innerWidth / 1.25
        const originY =
          window.innerWidth < 1000
            ? window.innerHeight
            : window.innerHeight / 1.375

        return {
          x: {
            min: originX - maxDist,
            max: originX + maxDist,
          },
          y: {
            min: originY - maxDist,
            max: originY + maxDist,
          },
        }
      }

      update() {
        const xNoise = simplex(this.xOff, this.xOff)
        const yNoise = simplex(this.yOff, this.yOff)
        const scaleNoise = simplex(this.xOff, this.yOff)

        this.x = map(xNoise, -1, 1, this.bounds['x'].min, this.bounds['x'].max)
        this.y = map(yNoise, -1, 1, this.bounds['y'].min, this.bounds['y'].max)
        this.scale = map(scaleNoise, -1, 1, 0.5, 1)

        this.xOff += this.inc
        this.yOff += this.inc
      }

      render() {
        this.graphics.x = this.x
        this.graphics.y = this.y
        this.graphics.scale.set(this.scale)

        this.graphics.clear()

        this.graphics.beginFill(this.fill)
        this.graphics.drawCircle(0, 0, this.radius)
        this.graphics.endFill()
      }
    }

    const app = new PIXI.Application({
      view: document.querySelector('.orb-canvas'),
      resizeTo: window,
      transparent: true,
    })

    app.stage.filters = [new KawaseBlurFilter(30, 10, true)]

    const colorPalette = new ColorPalette()

    const orbs = []

    for (let i = 0; i < 10; i++) {
      const orb = new Orb(colorPalette.randomColor())

      app.stage.addChild(orb.graphics)

      orbs.push(orb)
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      app.ticker.add(() => {
        orbs.forEach((orb) => {
          orb.update()
          orb.render()
        })
      })
    } else {
      orbs.forEach((orb) => {
        orb.update()
        orb.render()
      })
    }
  })

  const API_URL = `https://api.github.com`

  const handleRepoUrlChange = (event) => {
    const link = event.target.value
    setRepoLink(link)
  }

  const validateRepoUrl = () => {
    if (
      !repoLink.match(
        /^(https:\/\/|http:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+/
      )
    ) {
      setErrorMessage(
        'Please enter a valid GitHub repository link (e.g., https://github.com/username/repo)'
      )
      return false
    }
    setErrorMessage('')

    return true
  }

  const fetchBranches = () => {
    if (validateRepoUrl()) {
      const ownerAndRepo = repoLink.split('/').slice(-2).join('/')
      const branchUrl = `${API_URL}/repos/${ownerAndRepo}/branches`

      axios
        .get(branchUrl)
        .then((response) => {
          const branchOptions = response.data.map((branch) => ({
            value: branch.name,
            label: branch.name,
          }))
          setBranches(branchOptions)
          setFlag(true)

          const defaultBranch =
            branchOptions.find((branch) => branch.value === 'main') ||
            branchOptions.find((branch) => branch.value === 'master')
          if (defaultBranch) {
            setSelectedBranch(defaultBranch)
            fetchCommits(defaultBranch)
          }
        })
        .catch((error) => {
          console.error(error)
          setBranches([])
          setErrorMessage(
            'Failed to fetch branches. Please check your repository link.'
          )
        })
    }
  }

  const fetchCommits = (branch) => {
    const ownerAndRepo = repoLink.split('/').slice(-2).join('/')
    const commitsUrl = `${API_URL}/repos/${ownerAndRepo}/commits?sha=${branch.value}`

    axios
      .get(commitsUrl)
      .then((response) => {
        const commitOptions = response.data.slice(0, 10).map((commit) => ({
          value: commit.sha,
          label: `#${commit.sha.substring(0, 7)} - ${commit.commit.message}`,
        }))
        setCommits(commitOptions)

        if (commitOptions.length > 0) {
          setSelectedCommit(commitOptions[0])
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const executeAnalysis = () => {
    setIsLoading(true)
    const selcommitSHA = selectedCommit.value
    const requestData = {
      gitRepoLink: repoLink,
      branch: selectedBranch.value,
      commitId: selcommitSHA,
    }

    axios
      .post('http://localhost:8080/onecommit/getanalysis', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          setAnalysisData(response.data)
          navigate('/dashboard')
        }
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Navbar />
      <div className="main-con">
        {isLoading ? (
          <div className="loader">
            Please Wait While We Load Analysis For You.....
          </div>
        ) : (
          <>
            <canvas className="orb-canvas"></canvas>
            <div className="main-container">
              <div className="main-container__inner">
                <h1 className="main-container__title">
                  Analyze Your
                  <span className="text-gradient"> CODE</span> Now !!
                </h1>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Insert Your GitHub Repository Link"
                    value={repoLink}
                    onChange={handleRepoUrlChange}
                  />
                </div>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <button
                  className="main-container__button main-container_button--transparent"
                  onClick={fetchBranches}
                >
                  Fetch Branches
                </button>

                {flag ? (
                  <>
                    <div className="dropdowns" style={{ display: 'flex' }}>
                      <Select
                        className="select"
                        value={selectedBranch}
                        styles={styles.select}
                        onChange={(option) => setSelectedBranch(option)}
                        options={branches}
                        isSearchable={true}
                        placeholder=" Branch..."
                      />
                      <Select
                        className="select"
                        value={selectedCommit}
                        onChange={(option) => setSelectedCommit(option)}
                        options={commits}
                        isSearchable={true}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        placeholder="Commit..."
                      />
                    </div>
                    <div className="main-container__buttons">
                      <button
                        className="main-container__button"
                        onClick={executeAnalysis}
                      >
                        Execute
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                className="image_banner"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={banner}
                  alt="Banner"
                  style={{ width: '100%', height: '400px' }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Main
