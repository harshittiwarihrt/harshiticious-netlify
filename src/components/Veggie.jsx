import { useEffect, useState } from "react"
import styled from "styled-components"
import {Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import {Link} from "react-router-dom"


export default function Veggie() {

    const [veggie, setVeggie] = useState([])

    useEffect(()=>{
        getVeggie()
    },[])

    const getVeggie = async()=>{

        const check = localStorage.getItem('veggie')

        if (check){
          setVeggie(JSON.parse(check))
        }

        else{
          const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
        
          const data = await api.json()
          localStorage.setItem('veggie', JSON.stringify(data.recipes))
          setVeggie(data.recipes)
      }
        }

  return (
    <div>
          <Wrapper>
            <h3>veggie picks</h3>

            <Splide options={{
              perPage:3,
              arrows:false,
              pagination:false,
              drag:"free",
              gap:"3rem"
            }}>
              {veggie.map((recipe)=>{
                return(
                  <SplideSlide key={recipe.id}>
                    <Card>
                      <Link to={"/recipe/" + recipe.id}>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title}/>
                        <Gradient />
                      </Link>
                    </Card>
                  </SplideSlide>
                )
              })}
            </Splide>
          </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin : 4rem 0rem ;
`

const Card = styled.div`
  min-height : 20rem;
  max-width:20rem;
  overflow:hidden;
  position:relative;
  img {
    border-radius:1.2rem;
    position:absolute;
    // left:10px;
    object-fit:cover;
    width:100%;
    height:100%;
    // max-height:370px;
  }

  p{
    position:absolute;
    z-index:10;
    color:white;
    width:100%;
    text-align:center;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
    bottom:0;
    font-weight:650;
    left:5px;
  }
`

const Gradient = styled.div`
  z-index:3;
  position:absolute;
  width:100%;
  height:100%;
  background:linear-gradient(rgba(0,0,0,0) rgba(0,0,0,0.5))
`