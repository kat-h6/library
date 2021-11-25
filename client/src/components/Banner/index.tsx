import image from '../../assets/images/hatice-yardim-bookstore.jpg'
import './Banner.scss'

export default function Banner() {
  return (
    <div className="banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="container">
        <h1>
          The Little Local Library is your community book exchange program
        </h1>
        <p>Curl up on the couch, get comfy, and start reading.</p>
      </div>
    </div>
  )
}
