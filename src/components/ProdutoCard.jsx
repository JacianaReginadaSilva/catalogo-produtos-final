// src/components/ProdutoCard.jsx
const ProdutoCard = ({ nome, preco, categoria, emPromocao, children }) => {
  return (
    <div className={`card ${emPromocao ? 'promocao' : ''}`}>
      <h3>{nome}</h3>
      <p><small>Categoria: {categoria}</small></p>
      <p><strong>R$ {preco.toFixed(2)}</strong></p>
      
      {/* Aqui entra o conteúdo extra passado pelo App.jsx */}
      <div className="card-acoes">
        {children}
      </div>
    </div>
  );
};

export default ProdutoCard;