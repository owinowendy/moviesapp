import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://www.google.com/search?sa=X&sca_esv=4a7990c088c43e75&biw=1280&bih=632&sxsrf=ADLYWIIGT2IO6Uu200n5JO1lNtcxdT6DBA:1720354849235&q=Tune+in+for+Love&stick=H4sIAAAAAAAAAEVTTY7TMBhVkToadRhp1Fkgsao4AI3z48QjcQNmx95qnTpuYqe2Y-wkp0AcgTULrkEPwJIFO27AkhloviyfP3_ve-999vXyze222iIkUtWl2vP4Vp388dBtTq08tofz4n-5RntNxmicMA-8TlVBJ2y09bVQzYQnuvNitVXbiEVJNHggS22O9Ign3BCHn9rVdLntaVYDc-HrvYkAd0lOeicAs3iIaephsmlpxoIo4L7jWaaYnXDJI11VOfRrzwL1LTixmqic-RzEWWsZbwD7jOEk9ugiNmup6-dYEkXKenbmEUorjoC8y0lQwXaXZlKZhKSQWcFsNaoAznTOcTaAclGaIPtAgFw4EmQRg3JqTC6km3diGldW-8uwsmM2cLBlYl0Q0sFObMX3zEO9CwLRxMxOpO90TyEGnXFUZ6WEfuUKWttm5k9NLfM5RpdyLDy7iKEDT0k5Fd3TPnAy70zkkcEFURArc8aMloFToaNMzDtnmFWlHgDbgWMp6_68uHkehmKMbT-_oAFJjCTkJjSKRKOBvRxp3zk8T2-KURZN-Wvx7ubu95-f96_Tz1-__1i8Xb1q2MNWHcrj7iGInaPuRMPOMbG-Xy0fn4_Xq_X16urx3496-WV59-Fje9gc2w0_2c37kz98W774dLX4C3UuvdWFAwAA&ved=2ahUKEwiEjLSd9ZSHAxUkS_EDHQmBCZ4Q-BZ6BAglEA8'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://www.google.com/search?sca_esv=4a7990c088c43e75&sxsrf=ADLYWIJtYi1a-8KeQ8XbDke9yR6815qRrw:1720354810199&q=Sweet+%26+Sour&stick=H4sIAAAAAAAAAEVTO47bMBSEAzhYeHeBwFsESGWkSBmL-lDiAjnCVnsAwqZM0RIpkxRDSjpGjpA6xV4jPkDKFOlyg5TZTayncvj45s3MI6-W72-31RYho62vhWriW3Xyx0O3ObXy2B7Oi__lGu01GaNxwjzwOlUFnfDUPmGRqi7Vnp8Xq63aRixKosEDWWpzpEc84YY4_NyupsttT7MamAtf700EuEty0jsBmMVDTFMPk01LMxZEAfcdzzLF7IRLHumqyqFfexaob8GJ1UTlzOcgzlrLeAPYZwwnsUcXsVlLXT_HkihS1rMzj1BacQTkXU6CCra7NJPKJCSFzApmq1EFcKZzjrMBlIvSBNkHAuTCkSCLGJRTY3Ih3bwT07iy2l-GlR2zgYMtE-uCkA52Yiu-Zx7qXRCIJmZ2In2newox6IyjOisl9CtX0No2M39qapnPMbqUY-HZRQwdeErKqeie94GTeWcijwwuiIJYmTNmtAycCh1lYt45w6wq9QDYDhxLWffnxfXLMBRjbPv5BQ1IYiQhN6FRJBoN7OVI-87heXpTjLJoyl-LT9dvfv_5efcu_fLt-4_Fx9Xbht1v1aE87u6D2DnqTjTsHBPru9Xy4eV4vVpfrV4__PtRN1-XN4_hcHCbD5vH02f7tHz1FxD2WhN-AwAA&sa=X&sqi=2&ved=2ahUKEwjnx-WK9ZSHAxUeRPEDHTXiBJ4Q8sMGegQIHBA6&biw=1280&bih=632&dpr=1.5#'
  },
  {
    name: 'Monica Hall',
    url: 'https://www.google.com/search?sa=X&sca_esv=4a7990c088c43e75&biw=1280&bih=632&sxsrf=ADLYWIIGT2IO6Uu200n5JO1lNtcxdT6DBA:1720354849235&q=Trigger+Warning&stick=H4sIAAAAAAAAAEVTS47UMBBVkHo06mEEmlkgsRpxADrOx4lH4gizQ2JpdTttu5M4bTuWneQUiCOwngXXoA_AkgU7bsCSGehUls9V9eq9V8nl6t31RmwQ4oHXmSppcq2O_rDv745de-j2p-h_uUY7TaZ4mvHcPmOjra-lamYsM9Vn2vNTtN6oTcziNB49kGW2QHrCM26Iw0_jam7uBprXwFz6emdiwH1akMFJwCwZE5p52Gw6mrMgS-h3PM8VszOueKyFKGBeexao78CJ1UQVzBcgzlrLeAPY5wyniUdnsXlH3bDEkipS1Yszj1AmOALyviBBBdufh4kwKckgs5JZMakAznTBcT6CclmZ0A6BALl0JLRlAsqpMYVs3XIT07hK7M7Lqp7ZwMGWSXRJSA83sYLvmId6HySiqVmctL7XA4UYdM5RnVctzCtX0to2C39m6rZYYnQZx9Kzsxg68oxUc9E93QOny81kERtcEgWxMmfMZBk4lTrO5XJzhpmo9AjYjhy3bT2coqvnZSjB2A7LFzSiFqMWcpMaxbLRwF5NdOgdXrY35dSWTfUr-nD1-vefn7dvsy-P339E79dvGna_UfvqsL0PcuuoO9KwdUze3K5XD8_PN-uby_XFw78_6uXX1auP9iDE3t592tru0IlvqxefL6K_Hr3I-4QDAAA&ved=2ahUKEwiEjLSd9ZSHAxUkS_EDHQmBCZ4Q-BZ6BAglEAk'
  },
  {
    name: 'Jared Dunn',
    url: 'https://www.google.com/search?sa=X&sca_esv=4a7990c088c43e75&biw=1280&bih=632&sxsrf=ADLYWIIGT2IO6Uu200n5JO1lNtcxdT6DBA:1720354849235&q=Tune+in+for+Love&stick=H4sIAAAAAAAAAEVTTY7TMBhVkToadRhp1Fkgsao4AI3z48QjcQNmx95qnTpuYqe2Y-wkp0AcgTULrkEPwJIFO27AkhloviyfP3_ve-999vXyze222iIkUtWl2vP4Vp388dBtTq08tofz4n-5RntNxmicMA-8TlVBJ2y09bVQzYQnuvNitVXbiEVJNHggS22O9Ign3BCHn9rVdLntaVYDc-HrvYkAd0lOeicAs3iIaephsmlpxoIo4L7jWaaYnXDJI11VOfRrzwL1LTixmqic-RzEWWsZbwD7jOEk9ugiNmup6-dYEkXKenbmEUorjoC8y0lQwXaXZlKZhKSQWcFsNaoAznTOcTaAclGaIPtAgFw4EmQRg3JqTC6km3diGldW-8uwsmM2cLBlYl0Q0sFObMX3zEO9CwLRxMxOpO90TyEGnXFUZ6WEfuUKWttm5k9NLfM5RpdyLDy7iKEDT0k5Fd3TPnAy70zkkcEFURArc8aMloFToaNMzDtnmFWlHgDbgWMp6_68uHkehmKMbT-_oAFJjCTkJjSKRKOBvRxp3zk8T2-KURZN-Wvx7ubu95-f96_Tz1-__1i8Xb1q2MNWHcrj7iGInaPuRMPOMbG-Xy0fn4_Xq_X16urx3496-WV59-Fje9gc2w0_2c37kz98W774dLX4C3UuvdWFAwAA&ved=2ahUKEwiEjLSd9ZSHAxUkS_EDHQmBCZ4Q-BZ6BAglEA8'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://www.google.com/search?sa=X&sca_esv=4a7990c088c43e75&biw=1280&bih=632&sxsrf=ADLYWIIGT2IO6Uu200n5JO1lNtcxdT6DBA:1720354849235&q=My+Name+Is+Loh+Kiwan&stick=H4sIAAAAAAAAAEVTTY7TMBhVkDoadRgJdZCQWFUcgMb5ceKROACCcgWrdeq4SZzajmUnOQWaI7BmwTXoAViyYMcNWDIDzZfl8-fvfe-9z75evLndlBuEamKxcZWMbuXJHQ_d-tQ2x_ZwDv6XK7RXZAzHCXPPq0TmdMJaPTYLWU9YJLJLlOPnYLmRm5CFcTg4IEtMhtSIJzzNni63PU0rYM5dtdch4C7OSG8FYBYNEU0cTNYtTZkXOdy3PE0lMxMueKjKMoN-5ZinrgUnRhGZMZeBOGMM4zVglzIcRw5dxKYttf0cSyxJUc3OHEJJyRGQdxnx0pvu0kxKHZMEMsuZKUfpwZnKOE4HUC4K7ZveEyAXlvgmj0A51ToTjZ13omtblPvLsKJjxnOwpSOVE9LBTkzJ98xBvfMC0VjPThrXqZ5CDCrlqEqLBvqlzWll6pk_0VWTzTHahGPh2EUMHXhCiqloH_eB43lnIgs1zomEWJnVejQMnAoVpmLeOcOsLNQA2AwcN03Vn4Obp2Eowtj08wsaUINRA7kJhUJRK2AvRtp3Fs_T63xs8rr4Fby7efH7z8-718nD1-8_grfLVzW738hDcdzde7Gz1J6o31kmVnfLxfbpeLVcXS-vtv9-1PMvi5fbYf1pJw_r993640msPxz9rv22ePb5KvgLD3-uPokDAAA&ved=2ahUKEwiEjLSd9ZSHAxUkS_EDHQmBCZ4Q-BZ6BAglEBg'
  }
]


function App() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }
  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default App;
