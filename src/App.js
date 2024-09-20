import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [product, setProduct] = useState({})

  useEffect(() => {
    loadProduct()
  }, [])

  async function loadProduct() {
    let res = await fetch('http://localhost:2000/api/product')
    let resJson = await res.json()
    setProduct(resJson)
  }

  async function onChange(paramName, value) {
    let newProduct = { ...product }
    newProduct[paramName] = value
    setProduct(newProduct)

  }

  return (

    <div>

      {/*HEADER*/}
      <div className="product" >
        <input
          className="h1"
          value={product.name}
          onChange={(e) => {
            let value = e.target.value
            onChange('name', value)
          }}
        />
      </div>

      {/*IMAGE*/}
      <div>
        <img className="imgs" src={product.image} />
        Картинку можно поменять тут :
        <input className="product"
          value={product.image}
          onChange={(e) => {
            let value = e.target.value
            onChange('image', value)
          }}
        />
      </div>
      <br></br>
      {/* INGREDIENTS */}
      <div className="product">{
        product.ingreS?.map((ingredient, index) => {
          return (
            <div className="product">
              <input value={ingredient}
                key={index}
                onChange={(e) => {
                  let value = e.target.value
                  let newProduct = { ...product }
                  newProduct.ingreS[index] = value
                  setProduct(newProduct)
                }} />
              <button
              onClick={() => {
                // let value = e.target.value
                let newProduct = { ...product }
                newProduct.ingreS.splice(index,1)
                setProduct(newProduct)
              }}
              >Удалить</button>
            </div>
          )
        }
        )}
        <br></br>
        <button
          onClick={(e) => {
            let newProduct = { ...product }
            newProduct.ingreS.push('Новый ингредиент')
            setProduct(newProduct)
          }}
        >Добавить ингредиент
        </button>
      </div>
      <br></br>
      <br></br>
      {/*DESCRIPTION*/}
      <div className="product">
        <textarea value={product.description} rows="5"
          onChange={(e) => {
            let value = e.target.value
            onChange('description', value)
          }}
        >
        </textarea>
      </div>
    </div>
  );
}

export default App;
