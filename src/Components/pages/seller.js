import React from 'react';
import ListingCollection from '../components/ListingCollection';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import TopFilterBar from '../components/TopFilterBar';
import {useParams} from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background-color: #ff7814;
    border-bottom: solid 1px #ff7814;
    background-image: linear-gradient(to right, #ff690e, #ffb84e)
    -webkit-transform: translate3d(0,0,0);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #ff7814;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;



const Seller = () => {
    const { address } = useParams();

    return (
        <div>
            <GlobalStyles/>

            <section className='jumbotron breadcumb no-bg'
                     style={{backgroundImage: `url(${'/img/background/subheader.png'})`}}>
                <div className='mainbreadcumb'>
                    <div className='container'>
                        <div className='row m-10-hor'>
                            <div className='col-12 text-center'>
                                <h1>Marketplace</h1>
                                <p>{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <TopFilterBar showFilter={false}/>
                    </div>
                </div>
                <ListingCollection sellerId={address}/>
            </section>


            <Footer/>
        </div>
    );
};
export default Seller;