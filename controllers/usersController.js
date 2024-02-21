const supabase = require("../dbConnection")

exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }

    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase.from('users').select('*').eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Erro ao buscar o usuário.' });
    }

    if (data && data.length > 0) {
      return res.status(200).json(data[0]);
    } else {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.createUser = async (req, res) => {
  try{
    const { name, username, email, password, balance } = req.body
    const {data: verifyUser, errorverifyUser} = await supabase.from('users').select('email').eq('email', email)
    
    if (errorverifyUser) {
      return res.status(500).json({error: `Erro ao verificar se já existe um usuario com email: ${email}`})
    }
    if (verifyUser && verifyUser.length > 0){
      return res.status(409).json({ error: 'Usuário já existente.' })
    }
    
    const {data: verifyUserName, errorverifyUserName} = await supabase.from('users').select('username').eq('username', username)

    if (errorverifyUserName) {
      return res.status(500).json({error: `Erro ao verificar se já existe um usuario com username: ${username}`})
    }
    if (verifyUserName && verifyUserName.length > 0){
      return res.status(409).json({ error: 'Nome de usuário já existente.' })
    }

    const { error } = await supabase.from('users').insert([{name: name, username: username, email: email, password: password, balance: balance}])

    if (error){
      return res.status(500).json({ error: 'Erro ao criar o usuário.' });
    } else{
       return res.status(201).json({message: "Usuario criado com sucesso!"});
    }
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}