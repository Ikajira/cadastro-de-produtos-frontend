import { useEffect, useState, useRef } from "react";
import Style from "./CadastroProduto.module.css";
import api from "../services/api";

export default function CadastraProdutoReal() {



    const [produtos, setProdutos] = useState([]);


    async function pegaProdutos() {
        const produtosDaApi = await api.get('/produtos');

        setProdutos(produtosDaApi.data);

    };

    useEffect(() => {
        pegaProdutos()
    }, [])


    // Hook que permite guardar os valores do meu input aqui

    const inputNome = useRef();
    const inputDescricao = useRef();
    const inputPreco = useRef();
    const inputQuantEstoque = useRef();
    const inputImagem = useRef();


    // Quando eu enviar as informações clicando no botão vou fazer uma requisição do tipo post ao backend e ele irá cadastrar um produto
    async function criaProduto() {
        await api.post('/produtos', {
            nomeProduto: inputNome.current.value,
            descricao: inputDescricao.current.value,
            preco: inputPreco.current.value,
            quantEstoque: inputQuantEstoque.current.value,
            imgUrl: inputImagem.current.value
        })

        pegaProdutos();
    }


    return (
        <div className={Style.container_principal}>
            <form className={Style.container}>
                <h1>Cadastrar Produto</h1>
                <input name="nome_produto" type="text" placeholder="Nome do Produto" ref={inputNome} required  />
                <input name="descricao" type="text" placeholder="Descricao do Produto" ref={inputDescricao} required />
                <input name="preco" type="number" placeholder="Preco do Produto" ref={inputPreco} required />
                <input name="quant_estoque" type="number" placeholder="Quantidade no Estoque" ref={inputQuantEstoque} required/>
                <input name="img_url" type="text" placeholder="URL da imagem do produto" ref={inputImagem} required/>
                <button type="button" onClick={criaProduto}>Cadastrar</button>
            </form>

            {produtos.map(produto => (
                <div key={produto.idProduto} className={Style.card}>
                    <div>
                        <p>Nome Produto: <span>{produto.nomeProduto}</span></p>
                        <p>Descrição Produto: <span>{produto.descricao}</span></p>
                        <p>Preço Produto: <span>{produto.preco}</span> </p>
                        <p>Quantidade no Estoque: <span>{produto.quantEstoque}</span></p>
                        <p>Imagem do Produto:</p>
                        <img src={produto.imgUrl} alt={produto.nomeProduto} />

                    </div>
                </div>
            ))}

        </div>

    );
}