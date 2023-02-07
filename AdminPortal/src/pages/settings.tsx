/**
 * Renders the {url}/settings page.
 */

 import styles from '@/styles/Home.module.css';
 import { Sidebar } from '../components/sidebar';
 
 export default function Settings() {
   return (
     <>
       <main className={styles.main}>
         
         {<div>{'This is the settings page!'}</div>}
         <Sidebar 
           currentPage={"/settings"}/>
         
       </main>
       
       
       
     
     </>
   
   )
 }
 