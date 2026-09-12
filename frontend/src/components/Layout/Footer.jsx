import React, { useContext } from 'react'
import {Context} from "../../main"
import {Link} from "react-router-dom"
import { FaGithub , FaLinkedin} from "react-icons/fa"
import { SiLeetcode } from "react-icons/si";
function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
        <div>&copy; All Rights Reserved by Sameer Patel</div>
        <div>
          <Link to={'https://github.com/sameerpatel01'} target='_blank' rel='noreferrer'><FaGithub /></Link>
          <Link to={'https://leetcode.com/u/sam_11_/'} target='_blank' rel='noreferrer'><SiLeetcode /></Link>
          <Link to={'https://www.linkedin.com/in/sameerpat11el/'} target='_blank' rel='noreferrer'><FaLinkedin /></Link>
        </div>
      
    </footer>
  )
}

export default Footer