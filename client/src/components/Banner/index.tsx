import image from '../../assets/images/hatice-yardim-bookstore.jpg'
import './Banner.scss'

export default function Banner() {
  return (
    <div className="banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="container">
        <h1>Come wander in our cosy community library</h1>
        <p>Curl up on the couch, get comfy, and start browsing our books!</p>
      </div>
    </div>
  )
}
