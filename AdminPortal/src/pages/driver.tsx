import styles from '@/styles/Driver.module.css';
import { Sidebar } from '../components/sidebar';

export default function Ratings() {
  return (
    <>
      <main className={styles.outer}>
        <Sidebar currentPage={'/ratings'} />
        <div className={styles.backbutton}>
            <p>Back</p>
        </div>
        <div className={styles.header}>
            <h2>Gibby Gibson</h2>
            <h4>+1 (234) 567-8910</h4>
        </div>
        <div>
            <table className={styles.table}> 
                <tbody>
                    <tr>
                        <td>
                            <h3>License ID</h3>
                            <input placeholder="AY1678342"></input>
                        </td>
                        <td>
                            <h3>License Plate #</h3>
                            <input placeholder="AY1678342"></input>
                        </td>
                        <td>
                            <h3>Type</h3>
                            <input placeholder="Lorem"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Make</h3>
                            <input placeholder="Lorem"></input>
                        </td>
                        <td>
                            <h3>Model</h3>
                            <input placeholder="Lorem"></input>
                        </td>
                        <td>
                            <h3>Color</h3>
                            <input placeholder="Lorem"></input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className={styles.photo}>
            <h3>Photo</h3>
            <div className={styles.imageholder}></div>
        </div>
        
      </main>
    </>
  );
}