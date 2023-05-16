import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "../components/ProductTable";
import logo from "../assets/images/shopper-logo.png"
import Swal from 'sweetalert2';


export default function HomePageShopper() {
  const [csvData, setCsvData] = useState([]);
  const [productTable, setProductTable] = useState([]);
  const [updateButtonDisable,setUpdateButtonDisable] = useState(false)

  console.log("tabela", productTable);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const data = parseCsv(text);
      setCsvData(data);
    };

    reader.readAsText(file);
  };

  const parseCsv = (text) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",");
    const data = [];
    

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") {
        continue;
      }
      const values = line.split(",");
      const row = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      data.push(row);
    }
    console.log("data", data);
    return data;
  };

  async function priceValidation() {
   

    for (let i = 0; i < csvData.length; i++) {
      console.log(csvData[i]);
      await axios
        .post("http://localhost:5000/priceValidation", csvData[i])
        .then((response) => {
          const product = response.data[0]
          setProductTable((prevState) => [
            ...prevState,
            {
              product_code: product.code,
              product_name: product.name,
              current_price: product.sales_price,
              new_price: csvData[i].new_price,
              status: response.statusText,
            },
          ]);
        })
        .catch((error) => {
            setUpdateButtonDisable(true)
            console.log("erro",error.response.data)
            const errorResponse = error.response.data
            
            setProductTable((prevState) => [
                ...prevState,
                {
                  product_code: errorResponse.product[0] ? errorResponse.product[0].code : "",
                  product_name: errorResponse.product[0] ? errorResponse.product[0].name : "",
                  current_price: errorResponse.product[0] ? errorResponse.product[0].sales_price :"",
                  new_price: csvData[i].new_price,
                  status:errorResponse.errors.join('\n'),
                },
              ]);
        });
    }
  
  }

    async function updateProducts() {
        csvData.forEach((product)=>{
            axios.put("http://localhost:5000/updatePrice",product)
            .then(()=>
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Produtos atualizados com sucesso!'
              })
              )
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Ocorreu um error ao atualizar os produtos!'
                  });
            })
            setCsvData([])
            setProductTable([])
        })
    }

  return (
    <Main>
      <TopBar>
    <img src={logo} alt={"logo icon"}/>
    <h1>Teste Técnico</h1>
      </TopBar>
      <PageContainer>
        <InputTittle htmlFor="csv-input">Selecione um arquivo CSV:</InputTittle>
        <StyledInput
          type="file"
          id="csv-input"
          accept=".csv"
          onChange={handleFileChange}
        />
        <ButtonContainer>
        <ValidateButton onClick={priceValidation}>Validar</ValidateButton>
        {productTable.length>0&&<UpdateButton disabled={updateButtonDisable} onClick={updateProducts}>Atualizar</UpdateButton>}
        
        </ButtonContainer>
        <Table data={productTable} />
      </PageContainer>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-top: 6px solid #52b591;
`;
const TopBar = styled.div`
  display: flex;
  background-color: #ffffff;
  justify-content:space-evenly;
  align-items:center;
  width: 100%;
  height: 90px;

    img {
        width:150px;
    }
    h1 {
        font-family: "Montserrat";
        font-size: 30px;
        color:#52b591;
        font-weight:bold;
    }
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 100px;
  background: linear-gradient(to bottom, #e8f9f3, #ffffff);
`;
const InputTittle = styled.label`
    font-family: "Montserrat";
    font-size: 21px;
    margin-bottom:20px;
    color:#52b591;
    font-weight:bold;
`


const StyledInput = styled.input`
  background-color: #E5F3EC;
  border: 1px solid #52B591;
  font-family: "Montserrat";
  color:#52b591;
  border-radius: 20px;
  font-size: 16px;
  padding: 15px 15px;
  width: 60%;
  margin-bottom: 60px;
  height:50px;
  

  &:focus {
    outline: none;
  }
`;

const ButtonContainer=styled.div`
    display:flex;
    width:60%;
    justify-content:space-around;
`

const ValidateButton = styled.button`
  background-color: #52b591;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
  font-size: 22px;
  padding: 10px 15px;
  transition: background-color 0.2s ease-in-out;
  width: 250px;
  height: 50px;
  margin-bottom: 60px;
  font-family: "Montserrat";
  font-weight: bold;

  &:hover {
    background-color: #3a8c6c;
  }

  &:focus {
    outline: none;
  }

  &:first-child {
    border-radius: 20px;
  }

`;
const UpdateButton = styled.button`
  background-color: #52b591;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
  font-size: 22px;
  padding: 10px 15px;
  transition: background-color 0.2s ease-in-out;
  width: 250px;
  height: 50px;
  margin-bottom: 60px;
  font-family: "Montserrat";
  font-weight: bold;


  &:disabled {
    background-color:lightgray;
  }
  &:focus {
    outline: none;
  }


  &:first-child {
    border-radius: 20px;
  }
`;