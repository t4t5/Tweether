// client/components/Toast.js

import { ToastContainer } from 'react-toastify'

export default () => (
  <div className="toasts">
    <ToastContainer 
      autoClose={false}
    />

    <style jsx>{`
      .toasts {
        position: relative;
        z-index: 1000;
      }
    `}</style>
  </div>
)

