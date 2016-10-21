const h = require('react-hyperscript')
const {Link} = require('react-router')
const React = require('react')
const xhr = require('xhr')

const Moviedb = React.createClass({
    getInitialState: function() {
        return {
          s: '',
          r: 'json',
          movies: []
        }
    },
    handleSubmit: function(e) {
        e.preventDefault()
        xhr({
            method: 'GET',
            json: true,
            url: `https://www.omdbapi.com/?r=json&s=${this.state.s}`
        }, (err, res, body) => {
            if (err) {
                console.log(err.message)
            }
            this.setState({movies: body.Search})
        })
    },
    handleChange: function(e) {
        this.setState({s: e.target.value})
    },
    render: function() {
        return (
          h('div.vh-100.cover.bg-left.bg-center-l.bg-black-80.ma0.pa0', {
            style: {
                backgroundImage: 'url(http://images.fineartamerica.com/images-medium-large-5/movie-reels-marzena-grabczynska-lorenc.jpg)'
            }
        }, [
          h('div.vh-100.bg-black-70', [
                h('h1.fw1.f1.avenir.tc.white.pa2', 'Movies'),
                h('form.pa2.tc', {
                    onSubmit: this.handleSubmit
                }, [
                  h('input.pa2.input-reset.ba-white.bg-transparent.hover-bg-white.hover-black.w-50', {
                    onChange: this.handleChange}
                  )]
                ),
                h(Link, {
                    to: '/',
                    className: 'link db mt2 pa2 tc black avenir white'
                }, 'Home'),
                h('article', this.state.movies.filter(m => m.Poster !== 'N/A').map(movie))
            ])]))
    }
})

function movie(m) {
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
        }, [])])
}
module.exports = Moviedb
