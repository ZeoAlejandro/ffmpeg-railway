const path = require('path');

//Get podcast
const getPodcast = async (req, res) => {
  res.status(200).json({message: 'Tuto bene!'})
}

const insertPodcastNow = async (req, res) => {
  //Parámetros obtenidos del front
  const idProfile = req.body.idProfile
  const titlePodcast = req.body.titlePodcast
  const language = req.body.language
  let imagePodcast = null
  let nameCollection = null
  let idCollection = null
  let rssUrl = null
  const youtubeUrl = null

  //Comprobamos si hay image
  if (req.body.imagePodcast) {
    imagePodcast = req.body.imagePodcast
  }

  //Comprobamos si hay rssUrl
  if (req.body.rssUrl) {
    rssUrl = req.body.rssUrl
  }

  //Comprobamos si ha elegido una collection
  if (req.body.nameCollection) {
    nameCollection = req.body.nameCollection

    //Comprobamos si existe la colección
    const { data: data_c, error: error_c } = await supabase
      .from('collection_podcasts')
      .select('id_collection', 'collection_name')
      .eq('id_profile', idProfile)
      .eq('collection_name', nameCollection)

    //Si la collección no existe, la creamos
    if (data_c.length == 0) {
      //Insertar row en collection_podcasts
      const { data: data_cp, error: error_cp } = await supabase
        .from('collection_podcasts')
        .insert({ id_profile: idProfile, collection_name: nameCollection })
        .select()

      if (error_cp) {
        console.log(error_cp);
        res.status(400).json(error_cp)
      } else {
        //Asigmanos el  idCollection
        idCollection = data_cp[0].id_collection
      }

    } else {
      //Asigmanos el  idCollection
      idCollection = data_c[0].id_collection
    }

  } else {
    nameCollection = 'Untitled'

    //Comprobamos si existe la colección vacía
    const { data: data_c, error: error_c } = await supabase
      .from('collection_podcasts')
      .select('id_collection', 'collection_name')
      .eq('id_profile', idProfile)
      .eq('collection_name', nameCollection)
    if (error_c) {
      console.log(error_c)
      res.status(400).json(error_c)
    } else {
      //Si la collección no existe, la creamos
      if (data_c.length == 0) {
        //Insertar row en collection_podcasts
        const { data: data_cp, error: error_cp } = await supabase
          .from('collection_podcasts')
          .insert({ id_profile: idProfile, collection_name: nameCollection })
          .select()

        if (error_cp) {
          console.log(error_cp);
          res.json(error_cp)
        } else {
          //Asigmanos el  idCollection
          idCollection = data_cp[0].id_collection
        }
      } else {
        //Asigmanos el  idCollection
        idCollection = data_c[0].id_collection
      }
    }
  }

  //Insertar row en podcast_info
  const { data: data_pi, error: error_pi } = await supabase
    .from('podcasts_info')
    .insert({
      title_podcast: titlePodcast, image_podcast: imagePodcast, language_podcast: language, rss_url: rssUrl, youtube_url: youtubeUrl,
      id_profile: idProfile, id_collection: idCollection, collection_name: nameCollection
    })
    .select()

  if (error_pi) {
    console.log(error_pi);
    res.status(400).json(error_pi)
  } else {
    //Insertar row en podcast_results
    const { error: error_pr } = await supabase
      .from('podcasts_results')
      .insert({
        id_podcast: data_pi[0].id_podcast, transcript: null, newsletter: null, titles: null, notes: null,
        timestamps: null, bulletPoints: null, summary: null, blogPost: null, linkedin: null, tweets: null, keywords: null
      })

    if (error_pr) {
      console.log(error_pr);
      res.status(400).json(error_pr)
    } else {
      //Devolvemos el id del podcast creado
      console.log('Podcast creado: ' + data_pi[0].id_podcast)
      res.json(data_pi[0].id_podcast)
    }

  }

}

//Exports functions
module.exports = {
  insertPodcastNow,
  getPodcast
};
