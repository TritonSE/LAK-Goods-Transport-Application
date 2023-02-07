/**
 * Renders the {url}/ratings page.
 */

 import styles from '@/styles/Home.module.css';
 import { Sidebar } from '../components/sidebar';
 
 export default function Ratings() {
   return (
     <>
       <main className={styles.main}>
         
         {<div>{'This is the ratings page!'}</div>}
         <Sidebar 
           currentPage={"/ratings"}/>
         
       </main>
       
       
       
     
     </>
   
   )
 }
 