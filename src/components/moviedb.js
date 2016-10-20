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
        h('div.pa4', [
          h('h1', 'Movies'),
          h('form', {
            onSubmit: this.handleSubmit
          } ,[
            h('input.mb2', { onChange: this.handleChange })
          ]),
          // h('button.pa2', 'Browse All Movies'),
          h(Link, {
              to: '/',
              className: 'link db mt2'
          }, 'Home'),
          h('div', this.state.movies.map(movie =>
            h('img', {
              src: movie.Poster
            })
          ))
        ])
      )
    }
})


module.exports = Moviedb
