import CategoryPreview from "../CategoryPreview"
import ProductComponent from "../products/products"
import Carousel from '../Carousel';
import CarouselPromo from "../CarouselPromo";
import Box from '@mui/material/Box';


export default function Home() {

return (
    <div className="bg-white z-9">
    
    
    <div className="container mx-auto" >
       <Carousel />
    </div>

    {/* <div className="flex items-center"> */}
    <div className="container mx-auto" style={{ display: 'flex', alignItems: 'center' }} >    

      <div>
      <Box sx={{ typography: 'medium' , fontWeight: 'bold', color: '#003300' , ml: 6}}>Promotions</Box>
      </div>
     
      <div >
        <ProductComponent promo={true} />
      </div>

    </div>

   
    
    <div className="container mx-auto">
          <ProductComponent />
    </div>

    
    </div>

    
);


}