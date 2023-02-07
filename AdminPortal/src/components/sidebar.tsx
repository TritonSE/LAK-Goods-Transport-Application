import React from 'react';
import styles from '@/styles/Sidebar.module.css';

interface SidebarProps {
    currentPage: String;
}

export function Sidebar({ currentPage }: SidebarProps)
{
      return (
        <>
            <div className = {styles.sidebar}>
                <div className={styles.sidebarTabs}>
                    
                    {<button type="button" className={styles.sidebarLogo}>
                        <a href = "./admin" className={styles.sidebarLogoText}>
                        <img src={"/Logo.svg"} className="sidebarLogo"/>Laakta</a>
                    </button> }
                    
                    <div className = {styles.menu}>
                        {currentPage === "/admin" ? 
                        (<button type = "button" className = {styles.sidebarButton}>
                            <a href = "./admin" className = {styles.active}>Driver Registration</a>
                        </button>) : 
                        <button type = "button" className = {styles.sidebarButton}>
                            <a href = "./admin" className = {styles.buttonText}>Driver Registration</a>
                        </button>}
                        
                        {currentPage === "/ratings" ?
                        (<button type = "button" className = {styles.sidebarButton}>
                            <a href = "./ratings" className = {styles.active}>Ratings</a>
                        </button>): 
                        (<button type = "button" className = {styles.sidebarButton}>
                            <a href = "./ratings" className = {styles.buttonText}>Ratings</a>
                        </button>)}
                        
                        {currentPage === "/settings" ?
                        (<button type = "button" className = {styles.sidebarButton}>
                            <a href = "./settings" className = {styles.active}>Manage Admin</a>
                        </button>):
                        (<button type = "button" className = {styles.sidebarButton}>
                            <a href = "./settings" className = {styles.buttonText}>Manage Admin</a>
                        </button>)}
                        
                        {<button type="button" className={styles.sidebarProfile}>
                            <a href = "./profile">
                                <img src={"/Profile.svg"} className="sidebarProfile"/>
                            </a>
                        </button> }
                    
                    </div>
                    
                </div>
            </div>

        </>
    )
}
