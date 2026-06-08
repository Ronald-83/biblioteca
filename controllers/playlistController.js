const Jogador = require("../models/playlist");
const Clube = require("../models/song");

const { body, validationResult } = require("express-validator");

// Display list of all Jogadores.
exports.jogador_list = async (req, res, next) => {
  try {
    const allJogadores = await Jogador.find()
      .sort({ created_at: -1 })
      .exec();
    res.render("playlistViews/playlist_list", {
      title: "Jogadores",
      playlist_list: allJogadores,
    });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific Jogador.
exports.jogador_detail = async (req, res, next) => {
  try {
    const jogador = await Jogador.findById(req.params.id)
      .populate("clubs")
      .exec();

    if (jogador === null) {
      const err = new Error("Jogador não encontrado");
      err.status = 404;
      return next(err);
    }

    res.render("playlistViews/playlist_detail", {
      title: "Detalhes do Jogador",
      playlist: jogador,
    });
  } catch (err) {
    next(err);
  }
};

// Display Jogador create form on GET.
exports.jogador_create_get = (req, res, next) => {
  res.render("playlistViews/playlist_form", {
    title: "Criar Jogador",
  });
};

// Handle Jogador create on POST.
exports.jogador_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Nome do jogador é obrigatório."),
  body("position")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Posição do jogador é obrigatória."),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);

    const jogador = new Jogador({
      name: req.body.name,
      position: req.body.position,
    });

    if (!errors.isEmpty()) {
      res.render("playlistViews/playlist_form", {
        title: "Criar Jogador",
        playlist: jogador,
        errors: errors.array(),
      });
      return;
    }

    try {
      const newJogador = await jogador.save();
      res.redirect(newJogador.url);
    } catch (err) {
      next(err);
    }
  },
];

// Display Jogador update form on GET.
exports.jogador_update_get = async (req, res, next) => {
  try {
    const jogador = await Jogador.findById(req.params.id).exec();

    if (jogador === null) {
      const err = new Error("Jogador não encontrado");
      err.status = 404;
      return next(err);
    }

    res.render("playlistViews/playlist_form", {
      title: "Atualizar Jogador",
      playlist: jogador,
    });
  } catch (err) {
    next(err);
  }
};

// Handle Jogador update on POST.
exports.jogador_update_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Nome do jogador é obrigatório."),
  body("position")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Posição do jogador é obrigatória."),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);

    const jogador = await Jogador.findById(req.params.id).exec();

    if (jogador === null) {
      const err = new Error("Jogador não encontrado");
      err.status = 404;
      return next(err);
    }

    jogador.name = req.body.name;
    jogador.position = req.body.position;

    if (!errors.isEmpty()) {
      res.render("playlistViews/playlist_form", {
        title: "Atualizar Jogador",
        playlist: jogador,
        errors: errors.array(),
      });
      return;
    }

    try {
      await jogador.save();
      res.redirect(jogador.url);
    } catch (err) {
      next(err);
    }
  },
];

// Display Jogador delete form on GET.
exports.jogador_delete_get = async (req, res, next) => {
  try {
    const jogador = await Jogador.findById(req.params.id)
      .populate("clubs")
      .exec();

    if (jogador === null) {
      const err = new Error("Jogador não encontrado");
      err.status = 404;
      return next(err);
    }

    res.render("playlistViews/playlist_delete", {
      title: "Deletar Jogador",
      playlist: jogador,
    });
  } catch (err) {
    next(err);
  }
};

// Handle Jogador delete on POST.
exports.jogador_delete_post = async (req, res, next) => {
  try {
    const jogador = await Jogador.findById(req.params.id).populate("clubs").exec();

    if (jogador === null) {
      const err = new Error("Jogador não encontrado");
      err.status = 404;
      return next(err);
    }

    await Clube.deleteMany({ _id: { $in: jogador.clubs } }).exec();
    await Jogador.findByIdAndDelete(req.params.id).exec();
    res.redirect("/catalog/jogadores");
  } catch (err) {
    next(err);
  }
};

// Display form to add clube to jogador on GET.
exports.clube_create_get = async (req, res, next) => {
  try {
    const jogador = await Jogador.findById(req.params.id).exec();

    if (jogador === null) {
      const err = new Error("Jogador não encontrado");
      err.status = 404;
      return next(err);
    }

    res.render("playlistViews/song_form", {
      title: "Adicionar Clube ao Jogador",
      playlist: jogador,
    });
  } catch (err) {
    next(err);
  }
};

// Handle adding clube to jogador on POST.
exports.clube_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Nome do clube é obrigatório."),
  body("city")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Cidade é obrigatória."),
  body("founded")
    .isISO8601()
    .bail()
    .custom((value) => {
      const year = parseInt(value);
      if (year < 1900 || year > new Date().getFullYear()) {
        throw new Error(
          `Ano deve estar entre 1900 e ${new Date().getFullYear()}.`
        );
      }
      return true;
    }),
  body("championships")
    .isInt({ min: 0 })
    .withMessage("Campeonatos deve ser um número positivo."),
  body("description")
    .trim()
    .escape()
    .optional({ values: "falsy" }),
  body("logo_url")
    .trim()
    .optional({ values: "falsy" }),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);

    const clube = new Clube({
      name: req.body.name,
      city: req.body.city,
      founded: parseInt(req.body.founded),
      championships: parseInt(req.body.championships),
      description: req.body.description,
      logo_url: req.body.logo_url,
    });

    if (!errors.isEmpty()) {
      const jogador = await Jogador.findById(req.params.id).exec();
      res.render("playlistViews/song_form", {
        title: "Adicionar Clube ao Jogador",
        playlist: jogador,
        song: clube,
        errors: errors.array(),
      });
      return;
    }

    try {
      const newClube = await clube.save();
      const jogador = await Jogador.findById(req.params.id).exec();
      jogador.clubs.push(newClube._id);
      await jogador.save();
      res.redirect(jogador.url);
    } catch (err) {
      next(err);
    }
  },
];

// Display form to update clube on GET.
exports.clube_update_get = async (req, res, next) => {
  try {
    const [jogador, clube] = await Promise.all([
      Jogador.findById(req.params.id).exec(),
      Clube.findById(req.params.clubeId).exec(),
    ]);

    if (jogador === null || clube === null) {
      const err = new Error("Jogador ou Clube não encontrado");
      err.status = 404;
      return next(err);
    }

    res.render("playlistViews/song_form", {
      title: "Atualizar Clube",
      playlist: jogador,
      song: clube,
      update: true,
    });
  } catch (err) {
    next(err);
  }
};

// Handle clube update on POST.
exports.clube_update_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Nome do clube é obrigatório."),
  body("city")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Cidade é obrigatória."),
  body("founded")
    .isISO8601()
    .bail()
    .custom((value) => {
      const year = parseInt(value);
      if (year < 1900 || year > new Date().getFullYear()) {
        throw new Error(
          `Ano deve estar entre 1900 e ${new Date().getFullYear()}.`
        );
      }
      return true;
    }),
  body("championships")
    .isInt({ min: 0 })
    .withMessage("Campeonatos deve ser um número positivo."),
  body("description")
    .trim()
    .escape()
    .optional({ values: "falsy" }),
  body("logo_url")
    .trim()
    .optional({ values: "falsy" }),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);

    const clube = new Clube({
      name: req.body.name,
      city: req.body.city,
      founded: parseInt(req.body.founded),
      championships: parseInt(req.body.championships),
      description: req.body.description,
      logo_url: req.body.logo_url,
      _id: req.params.clubeId,
    });

    if (!errors.isEmpty()) {
      const jogador = await Jogador.findById(req.params.id).exec();
      res.render("playlistViews/song_form", {
        title: "Atualizar Clube",
        playlist: jogador,
        song: clube,
        errors: errors.array(),
        update: true,
      });
      return;
    }

    try {
      await Clube.findByIdAndUpdate(req.params.clubeId, clube, {});
      const jogador = await Jogador.findById(req.params.id).exec();
      res.redirect(jogador.url);
    } catch (err) {
      next(err);
    }
  },
];

// Display clube delete form on GET.
exports.clube_delete_get = async (req, res, next) => {
  try {
    const [jogador, clube] = await Promise.all([
      Jogador.findById(req.params.id).exec(),
      Clube.findById(req.params.clubeId).exec(),
    ]);

    if (jogador === null || clube === null) {
      const err = new Error("Jogador ou Clube não encontrado");
      err.status = 404;
      return next(err);
    }

    res.render("playlistViews/song_delete", {
      title: "Deletar Clube",
      playlist: jogador,
      song: clube,
    });
  } catch (err) {
    next(err);
  }
};

// Handle clube delete on POST.
exports.clube_delete_post = async (req, res, next) => {
  try {
    const jogador = await Jogador.findById(req.params.id).exec();
    const clube = await Clube.findById(req.params.clubeId).exec();

    if (jogador === null || clube === null) {
      const err = new Error("Jogador ou Clube não encontrado");
      err.status = 404;
      return next(err);
    }

    jogador.clubs.pull(req.params.clubeId);
    await jogador.save();
    await Clube.findByIdAndDelete(req.params.clubeId).exec();
    res.redirect(jogador.url);
  } catch (err) {
    next(err);
  }
};
