import React from 'react'
import styles from './Alert.module.css'

function ConfirmAlert({action , closePrompt}) {
  const handleConfirm = ()=>{
    action()
  }
  return (
    <>
    <div className={styles.wrapper}></div>
    <div className={styles.page}>
      <h3 style={{textAlign:'center'}} >Are You confirm you want to delete ? </h3>
      <div className={styles.action}>
        <h3 className={styles.confirm} onClick={handleConfirm} >Confirm Delete</h3>
        <h3 className={styles.cancel} onClick={closePrompt} > Cancel</h3>
      </div>
    </div>
    </>
  )
}

export default ConfirmAlert
