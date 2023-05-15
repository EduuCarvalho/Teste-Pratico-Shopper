import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "../components/ProductTable";

export default function HomePageShopper() {
  const [csvData, setCsvData] = useState([]);
  const [productTable, setProductTable] = useState([]);
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
          console.log("deu bom");
          console.log(response.data);
          setProductTable((prevState) => [
            ...prevState,
            {
              product_code: response.data[0].code,
              product_name: response.data[0].name,
              current_price: response.data[0].sales_price,
              new_price: csvData[i].new_price,
              status: response.statusText,
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <Main>
      <TopBar>ola</TopBar>
      <PageContainer>
        <InputTittle htmlFor="csv-input">Selecione um arquivo CSV:</InputTittle>
        <StyledInput
          type="file"
          id="csv-input"
          accept=".csv"
          onChange={handleFileChange}
        />
        <StyledButton onClick={priceValidation}>Validar</StyledButton>
        <Table data={productTable} />
      </PageContainer>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  border-top: 6px solid #52b591;
`;
const TopBar = styled.div`
  display: flex;
  background-color: #ffffff;
  width: 100%;
  height: 90px;
  align-items: center;
  justify-content: space-around;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 150px;
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
  padding: 10px 15px;
  width: 60%;
  margin-bottom: 60px;
  

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
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
    border-radius: 20px 0px 0px 20px;
  }

  &:last-child {
    border-radius: 0px 20px 20px 0px;
  }
`;
