const React = require('react')
// const axios = require('axios')

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: ['test', 'test2', 'test3']
    }
  }

  // loadSnippetsFromServer () {
  //   axios.get('/snippets')
  //     .then((res) => {
  //       console.log(res)
  //       this.setState({data: res.data.results})
  //       return
  //     })
  // }
  //
  // getInitialState () {
  //   return {data: []}
  // }

  // componentDidMount () {
  //   this.loadSnippetsFromServer()
  // }
  render () {
    return (
      <div>
        <h1>Hello React With Snippets!</h1>
        <ul>
          {this.state.data.map((element) => {
            return (
              <li>{element}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Landing
