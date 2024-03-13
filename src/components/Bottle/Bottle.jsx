import PropTypes from 'prop-types'
import './Bottle.css'

const Bottle = ({bottle , handleAddToCart}) => {
    const{name , img , price} = bottle
    return (
        <div className="bottle">
            <h4>Bottle : {name}</h4>
            <img src={img} alt="" />
            <h6>Price: ${price}</h6>
            <button onClick={() => handleAddToCart(bottle)} className='button'>Purches</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handleAddToCart: PropTypes.func.isRequired
}

export default Bottle;