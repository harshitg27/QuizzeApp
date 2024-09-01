import React, { useEffect, useState } from 'react'
import styles from './QuizLinkPrompt.module.css'
import { GrClose, GrFormCheckmark } from 'react-icons/gr'

function QuizLinkPrompt({ closePrompt, quizLink }) {
    const [copyLink, setCopyLink] = useState(false)

    const copyToClipboard = async () => {
        await window.navigator.clipboard.writeText(quizLink)
        setCopyLink(true)
    }

    useEffect(() => {
        if (copyLink) {
            setTimeout(() => {
                setCopyLink(false)
            }, 5000)
        }
    }, [copyLink])
    return (
        <>
    <div className={styles.wrapper}></div>
        <div className={styles.page}>
            <div className={styles.closeIcon} onClick={closePrompt}> <GrClose style={{ width: '1.25rem', height: '1.25rem', color: '#474444' }} /> </div>

            {copyLink && <div className={styles.copylink}>
                <GrFormCheckmark style={{ width: '1.5rem', height: '1.5rem', color: '#60b84b' }} />
                <p>Link Copied to Clipboard</p>
            </div>}

            <h1>Congrats your Quiz is Published!</h1>

            <div className={styles.linkDiv}>
                <p>{quizLink} </p>
            </div>

            <button className={styles.shareButton} onClick={copyToClipboard}>Share</button>
        </div>
        </>
    )
}

export default QuizLinkPrompt
