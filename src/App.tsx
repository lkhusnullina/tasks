import styles from './App.module.scss';
import { AppRoutes } from './routers';

function App() {
  return (
    <div className={styles.container}>
     <AppRoutes />
    </div>
  )
}
export default App