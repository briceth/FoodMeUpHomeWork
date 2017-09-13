import React, { Component } from 'react'
//import connect from 'redux-connect-decorator'
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/products'

import { Emoticons } from '../components/emoticon'
import { Loading } from '../components/loading'
import { Filter } from '../components/filter'
import { Container } from '../components/container'
import axios from 'axios'
import LoadingSquare from '../utils/Loader'
import FilterInput from './FilterInput'
import update from 'react-addons-update'
import Waypoint from 'react-waypoint'
import Emoticon from './Emoticon'
import { _calculateDateDiff, _formatDateAndPrice, _manageDate } from '../utils/Helpers'

class EmoticonList extends Component {
  constructor() {
    super()
    this._handleWaypointEnter = this._handleWaypointEnter.bind(this)

    this.state = {
      skip: 30
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts())
    this.setState({ loading: false })
  }

  _renderEmoticons() {
    let emoticons = this.props.emoticons.products[0]
    console.log(emoticons)
    if(typeof emoticons == 'object') {
      return emoticons.map((emoticon, index) => {
        return <Emoticon emoticon={emoticon} key={index} manageDate={_manageDate}/>
      })
    }
  }

  _handleWaypointEnter() {
    const { skip } = this.state

    this.props.dispatch(fetchProducts(skip))
    // console.log('_handleWaypointEnter')
    this.setState({ skip: skip + 30 })
    //
    // axios.get(`http://localhost:8000/api/products?limit=30&skip=${skip}`)
    // .then((response) => {
    //   const ndjson = response.data.split('\n').slice(0, -1)
    //   const json = ndjson.map((item, i) => JSON.parse(item))
    //
    //   if (!Array.isArray(json) || !json.length) {
    //   // array does not exist, is not an array, or is empty
    //     this.setState({ noMoreData: true })
    //   }
    //
    //   const formatDateAndPrice = _formatDateAndPrice(json)
    //
    //   const currentEmoticons = this.state.emoticons
    //   for (let i = 0; i < formatDateAndPrice.length; i++) {
    //     currentEmoticons.push(formatDateAndPrice[i])
    //   }
    //
    //   this.setState({ emoticons: currentEmoticons, skip: skip + 30 })
    }



  // _renderLoadingOrEndOfCatalogue () => {
  //   if(this.state.noMoreData) {
  //     return <div>~ end of catalogue ~</div>
  //   } else {
  //     return <LoadingSquare type='bars' color='#444' />
  //   }
  // }


  render() {
    if (!this.props.emoticons.products[0]) {
      return (
        <Loading>
          <LoadingSquare type='bars' color='#444' />
        </Loading>
      )
    }

    return (
      <Container>
        <Emoticons>
          { this._renderEmoticons() }
          <Waypoint
            onEnter={this._handleWaypointEnter}
            onLeave={this._handleWaypointEnter}
           />
        </Emoticons>
        <Loading>
          {/* { this._renderLoadingOrEndOfCatalogue() } */}
        </Loading>
      </Container>
    );
  }
}

function mapStateToProps({ emoticons }) {
  return { emoticons }
}

export default connect(mapStateToProps)(EmoticonList)
