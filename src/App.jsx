import { useState, useEffect } from 'react';
import ProdutoCard from './components/ProdutoCard';
import './App.css';

function App() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true); // Estado de carregamento
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [buscaNome, setBuscaNome] = useState('');
  const [novoProd, setNovoProd] = useState({ nome: '', preco: '', categoria: 'Periféricos' });

  // 1. useEffect + Fetch + Async/Await (Requisito 3 e 4)
  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Simulando atraso de rede de 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verifica se há dados no LocalStorage primeiro
        const dadosSalvos = localStorage.getItem('meuCatalogo');
        
        if (dadosSalvos) {
          setListaProdutos(JSON.parse(dadosSalvos));
        } else {
          const resposta = await fetch('./produtos.json'); // Adicione o ponto antes da barra
          const dados = await resposta.json();
          setListaProdutos(dados);
        }
      } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  // 2. Persistência no LocalStorage (Desafio Extra)
  useEffect(() => {
    if (listaProdutos.length > 0) {
      localStorage.setItem('meuCatalogo', JSON.stringify(listaProdutos));
    }
  }, [listaProdutos]);

  const adicionarProduto = (e) => {
    e.preventDefault();
    if (!novoProd.nome || !novoProd.preco) return;

    const item = { 
      ...novoProd, 
      id: Date.now(), 
      preco: parseFloat(novoProd.preco), 
      emPromocao: false 
    };

    setListaProdutos([...listaProdutos, item]);
    setNovoProd({ nome: '', preco: '', categoria: 'Periféricos' });
  };

  // 3. Função para Remover Produto (Requisito 1 e 2)
  const removerProduto = (id) => {
    const novaLista = listaProdutos.filter(p => p.id !== id);
    setListaProdutos(novaLista);
  };

  const produtosExibidos = listaProdutos.filter(p => {
    const condicaoCategoria = filtroCategoria === 'Todos' || p.categoria === filtroCategoria;
    const condicaoNome = p.nome.toLowerCase().includes(buscaNome.toLowerCase());
    return condicaoCategoria && condicaoNome;
  });

// Garante que o total seja recalculado toda vez que a lista filtrada mudar
const precoTotal = produtosExibidos.reduce((total, item) => {
  // Convertemos para número para evitar que o JS tente "somar textos"
  const valor = Number(item.preco) || 0;
  return total + valor;
}, 0);

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Catálogo Pro Final</h1>
        <p>Atividade Integrada - Unidade 4</p>
      </header>

      {/* Formulário com onSubmit (Requisito 1) */}
      <section className="formulario-secao">
        <h3>✨ Cadastrar Novo Item</h3>
        <form onSubmit={adicionarProduto} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Nome" value={novoProd.nome} onChange={e => setNovoProd({...novoProd, nome: e.target.value})} />
          <input type="number" placeholder="Preço" value={novoProd.preco} onChange={e => setNovoProd({...novoProd, preco: e.target.value})} />
          <select value={novoProd.categoria} onChange={e => setNovoProd({...novoProd, categoria: e.target.value})}>
            <option>Periféricos</option><option>Vídeo</option><option>Áudio</option>
          </select>
          <button type="submit" className="btn-comprar" style={{ backgroundColor: '#27ae60', margin: 0 }}>Adicionar</button>
        </form>
      </section>

      {/* Busca e Filtros */}
      <section style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <input type="text" placeholder="🔍 Buscar..." value={buscaNome} onChange={(e) => setBuscaNome(e.target.value)} style={{ padding: '8px', flex: 2 }} />
        <select onChange={(e) => setFiltroCategoria(e.target.value)} style={{ padding: '8px', flex: 1 }}>
          <option value="Todos">Todas Categorias</option>
          <option value="Periféricos">Periféricos</option><option value="Vídeo">Vídeo</option><option value="Áudio">Áudio</option>
        </select>
      </section>

      {/* Mensagem de Carregamento (Requisito 4) */}
      {carregando ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>⏳ Carregando produtos...</h2>
        </div>
      ) : (
        <div className="produto-grid">
          {produtosExibidos.map(prod => (
            <ProdutoCard key={prod.id} {...prod}>
              <button className="btn-comprar">Comprar</button>
              {/* Botão Remover com onClick (Requisito 1) */}
              <button 
                onClick={() => removerProduto(prod.id)}
                style={{ backgroundColor: '#ff4d4d', marginTop: '5px' }}
                className="btn-comprar"
              >
                Remover
              </button>
            </ProdutoCard>
          ))}
        </div>
      )}

      <footer style={{ marginTop: '40px', textAlign: 'right', borderTop: '2px solid #ddd', padding: '20px' }}>
        <h2>Total: R$ {precoTotal.toFixed(2)}</h2>
      </footer>
    </div>
  );
}

export default App;