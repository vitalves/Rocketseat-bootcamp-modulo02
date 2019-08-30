import * as Yup from 'yup'; // para validacao
import { startOfHour, parseISO, isBefore } from 'date-fns'; // para datas
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class AppointmentController {
  async index(req, res) {
    // possibilita a paginacao
    const { page = 1 } = req.query; // se 'page' nao for informado o valor e 1

    // seleciona todos
    const appointment = await Appointment.findAll({
      // onde: user_id = req.userId nao cancelados
      where: { user_id: req.userId, canceled_at: null },
      // ordenar por dada
      order: ['date'],
      // Atibutos que serao usados: (pra nao mandar todos)
      attributes: ['id', 'date'],
      // PAGINACAO
      limit: 20,
      offset: (page - 1) * 20, // 20 results por pagina
      // FIM PAGINACAO
      // incluir os dados do prestador de servicos
      include: [
        {
          model: User,
          as: 'provider',
          // atributos a serem retornados
          attributes: ['id', 'name'],
          // incluir o avatar do usuario:
          include: [
            {
              model: File,
              as: 'avatar',
              // atributos necessario do avatar (pra nao mandar todos)
              attributes: ['id', 'path', 'url'], // 'path' é necessario pois e pedido no File.js
            },
          ],
        },
      ],
    });
    return res.json(appointment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validacao dos dados' });
    }

    const { provider_id, date } = req.body;

    // verifica se o provider_is é um provedor de serviços
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'voce nao pode marcar esse servico ' });
    }

    // VERIFICACOES DE DATA E HORA:

    // pega a hora sem mins e segs
    const hourStart = startOfHour(parseISO(date));

    // verifica se a data passada é anterior a atual
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Data anterior nao permitida ' });
    }

    // verifica se a dada esta disponivel
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res.status(400).json({ error: 'Data nao disponivel ' });
    }

    // FIM VERIFICACOES DE DATA E HORA

    // Criar no banco de dados
    const appointment = await Appointment.create({
      user_id: req.userId, // userId é setado no middleware de autenticacao
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
