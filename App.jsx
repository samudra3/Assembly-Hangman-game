import React from 'react'
import clsx from 'clsx'
import {attribute} from './language.js'
import {getFarewellText} from './utils.js'
import {randomWords} from './utils.js'
import Confetti from 'react-confetti';

export default function(){
      const[currentWord,currentWordController] = React.useState(()=>randomWords().toUpperCase())
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
        const [responseKey, setResponse]=React.useState([])
        const wrongGuessCount = responseKey.filter((item)=>!currentWord.includes(item)).length
        
    const language = attribute.map((item,index)=>{
     const lostlang = index<wrongGuessCount
        const style = {
            color:item.color,
            backgroundColor:item.background,
        }
        const classname = clsx(lostlang && 'lost');
    
        return <span key={item.name} style={style} className={classname}>{item.name}</span>
    })
    
      function response(value){
      setResponse((oldvalue)=>{
        return oldvalue.includes(value)?oldvalue:[...oldvalue,value]
      })
      }
        const alphabetArray = Array.from(alphabet)
        const isGameWon = currentWord.split("").every((item)=> responseKey.includes(item))
        const isGameLost= wrongGuessCount===language.length-1
        const isGameOver = isGameLost || isGameWon
        const isfarewell = wrongGuessCount>0 && wrongGuessCount<language.length-1 && !isGameWon
        const statusclass = clsx('status',{won:isGameWon,lost:isGameLost,farewell:isfarewell})
        
          const wordArray = Array.from(currentWord)
        const displayWord = wordArray.map((item,index)=>{
            const visible =responseKey.includes(item)
            
            // const hidden = !responseKey.includes(item)
            // const classname = clsx({correct:visible,wrong:hidden})
        return  <span key={index} className={visible?null:'red-letter'}>{visible?item.toUpperCase():isGameLost?item.toUpperCase():null}</span>
        })
        
        
         const keyElement = alphabetArray.map((item,index)=>{
          const isGuessed = responseKey.includes(item.toUpperCase())
        
          const isCorrect = isGuessed && currentWord.includes(item.toUpperCase())
        
         const  isWrong = isGuessed && !currentWord.includes(item.toUpperCase())
          const classname = clsx({correct:isCorrect,wrong:isWrong})
            
            return <button key={index}  onClick={()=>response(item.toUpperCase())} className={classname} disabled={isGameOver} aria-disabled={responseKey.includes(item)} aria-label={`letter ${item}`} > 
            {item.toUpperCase()}
            </button>
        })
       function handleStatus(){
        if(!isGameOver){
         return   null
        }
        if(isGameWon){
        return (   <>
        <h3>you won!</h3>
         <p>well done</p>
         </>)
        }else{
        return  (<>
        <h3>you lost!</h3>
         <p>you better start learning assembly</p>
         </> ) 
        }
       }
    const[farewell, farewellController] = React.useState(null)
      React.useEffect(()=>{
        const message = wrongGuessCount>0?getFarewellText(attribute[wrongGuessCount-1].name):null
       farewellController(message)
         
       },[wrongGuessCount])
         
         function reset(){
          setResponse([]);
          currentWordController(randomWords().toUpperCase())
         }
        
    return(
        <> 
      <main>
       {isGameWon &&
        <Confetti
        recycle={false}
        numberOfPieces={1000}
       />}
        <header>
        <h1>Assembly: EndGame</h1>
        <p> Guess the word within 8 attempts to keep the
           programming world safe from Assembly!</p>
         </header>
         <section className={statusclass} aria-live='polite' role='status'>
        {handleStatus()?handleStatus():<p className='farewell-message'>{farewell}</p>}
         </section>
         <div className='language-container'>
         {language}
         </div>
         <div className='word-display'>
         {displayWord}
         </div>
         <div className='key-display'>
         {keyElement}
         </div>
         {isGameOver && <button className='game-button' onClick={reset}>New Game</button>}
      </main>
        </>
    )
}