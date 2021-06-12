import React, { useState, useEffect } from 'react'
// Import Component(s)
import { SingleFlat } from './SingleFlat'
// Axios
import axios from 'axios'

// * NOTES * // 

// Öncelikle yollanan API aşağıda bulunan URL kısmına girilmesi gerekiyor.

// Veri alınırken çıkan bir loading spinner ve Back to the Top button ekledim.

// Radio buttonları daha iyi şekillendirmek ve atılan görseldekine benzetmek için custom yaptım.

// Apartmanların bulunduğu SingleFlat componentda, farklı özelliklerin arasında birer line var, onları normal yapmıştım ama snaıyorum ekran çözünürlüğümden dolayı biri 1px diğeri 2px gibi gözüküyordu, o sebeple bu çizgileri biraz farklı bir yöntemle yaptım, SCSS'de div.horizontal-line-junior elementinde görebilirsiniz.

// Sonradan eklediğim dependency olarak sadece axios var, API için ekledim onu da zaten.

export const Flats = () => {

  const [flatStatus, setFlatStatus] = useState('All') // default is All Flats
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [flatData, setFlatData] = useState([])

  // Filtered Results
  const [availableFlats, setAvailableFlats] = useState([])
  const [reservedFlats, setReservedFlats] = useState([])
  const [soldFlats, setSoldFlats] = useState([])
  const [notReleasedFlats, setNotReleasedFlats] = useState([])

  const URL = '' // ** API URL in here **

  // Gather data 
  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
      method: 'GET',
      url: `${URL}`
    }).then(res => {
      setFlatData(res.data)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (availableFlats.length !== 0) { return }
    setAvailableFlats(flatData.filter((flat) => { return flat.status_id === 1 }))
    setReservedFlats(flatData.filter((flat) => { return flat.status_id === 2 }))
    setSoldFlats(flatData.filter((flat) => { return flat.status_id === 3 }))
    setNotReleasedFlats(flatData.filter((flat) => { return flat.status_id === 4 }))
  }, [flatData])

  useEffect(() => {
    switch (flatStatus) {
      case 'Available':
        setFlatData(availableFlats)
        return
      case 'Reserved':
        setFlatData(reservedFlats)
        return
      case 'Sold':
        setFlatData(soldFlats)
        return
      case 'Not Released':
        setFlatData(notReleasedFlats)
        return
      default:
        return
    }
  }, [flatStatus])

  // Back to The Top Button 
  const [showScroll, setShowScroll] = useState(false)
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  window.addEventListener('scroll', checkScrollTop)

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flats-component">

      <div className="results">

        {loading ?

          <div className="loading-spinner">
            <div className="outer-disk">
              <div className="inner-disk"></div>
            </div>
            <div className="upper-left-transparent"></div>
            <div className="lower-right-transparent"></div>
          </div>

          : ''}

        {flatData.map((flat) => {
          return <SingleFlat key={flat.zoho_id} flat={flat} />
        })}

        {error ? <p className="error-message">Sorry an error occured...</p> : ''}

      </div>


      <div className="side-filter">
        <p className="grande-title">Filter</p>
        <div className="horizontal-line"></div>
        <p className="tall-title">Status</p>
        <div className="radio-button-container">

          <div className="radio-button-component">
            <div className="radio-button-self" onClick={() => setFlatStatus('Available')}>
              {flatStatus === 'Available' ? <div className="inner"></div> : ''}
            </div>
            <p onClick={() => setFlatStatus('Available')}>Available</p>
          </div>

          <div className="radio-button-component">
            <div className="radio-button-self" onClick={() => setFlatStatus('Reserved')}>
              {flatStatus === 'Reserved' ? <div className="inner"></div> : ''}
            </div>
            <p onClick={() => setFlatStatus('Reserved')}>Reserved</p>
          </div>

          <div className="radio-button-component">
            <div className="radio-button-self" onClick={() => setFlatStatus('Sold')}>
              {flatStatus === 'Sold' ? <div className="inner"></div> : ''}
            </div>
            <p onClick={() => setFlatStatus('Sold')}>Sold</p>
          </div>

          <div className="radio-button-component">
            <div className="radio-button-self" onClick={() => setFlatStatus('Not Released')}>
              {flatStatus === 'Not Released' ? <div className="inner"></div> : ''}
            </div>
            <p onClick={() => setFlatStatus('Not Released')}>Not Released</p>
          </div>

        </div>

        {showScroll ? <button onClick={() => scrollTop()} className="to-the-top-button">Back to the Top</button> : ''}

      </div>

    </div>
  )
}
