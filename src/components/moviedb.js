const h = require('react-hyperscript')
const {
  Link
} = require('react-router')
const xhr = require('xhr')
const React = require('react')

const Moviedb = React.createClass ({
    getInitialState: function () {
        return {
          s: '',
          r: 'json',
          movies: []
        }
    },
    handleChange: function (e) {
      this.setState({
        s: e.target.value
      })
    },
    handleSubmit: function (e) {
      e.preventDefault()
      xhr({
        method: 'GET',
        json: true,
        url: `https://www.omdbapi.com/?r=json&s=${this.state.s}`
      }, (err, res, body) => {
        console.log(JSON.stringify(body, null, 2))
        if (err) { console.log(err.message) }
        this.setState({
          movies: body.Search
        })
      })
    },
    render: function () {
      console.log(this.state.movies)
      return (
        h('div.vh-100.cover.bg-left.bg-center-l', {
          style: {
            backgroundImage: 'url(http://images.fineartamerica.com/images-medium-large-5/movie-reels-marzena-grabczynska-lorenc.jpg)',

          }
        }, [
          h('h1.white.tc', 'Movies'),
          h('form', {
            onSubmit: this.handleSubmit
          } ,[
            h('input.mb2', { onChange: this.handleChange })
          ]),
          // h('button.f6.dim.br-pill.ph3.pv2.mb2.dib.bg-mid-gray', 'Browse All Movies'),
          h(Link, {
              to: '/',
              className: 'link db mt2'
          }, 'Home'),
          h('article', this.state.movies.filter(m => m.Poster !== 'N/A').map(movie)
          )
        ])
        // h('button', 'Next')
      )
    }
})

// fancy presentation
function movie (m) {
      return h(Link, {
        to: `/moviedb/${m.imdbID}`,
        className: 'fl w-50 w-25-l link overflow-hidden',
        href: '#'
      }, [
        h("div.grow.aspect-ratio--4x6.", {
          style: {
            background: `url(${m.Poster}) no-repeat center center`,
            backgroundSize: 'cover'
          }
        })
    ])
}

module.exports = Moviedb
