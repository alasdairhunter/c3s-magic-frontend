import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
const WMJSTileRendererTileSettings = require('../../config/basemaps');
export default class ReactWebMapJS extends PureComponent {
  constructor (props) {
    super(props);
    this.webMapJSCreated = false;
    this.resize = this.resize.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
  }
  _handleWindowResize () {
    this.resize();
  }

  shouldComponentUpdate (nextProps, nextState) {
    // console.log('shouldComponentUpdate?');
    if (this.props.layers.length !== nextProps.layers.length) return true;
    for (let j = 0; j < this.props.layers.length; j++) {
      if (nextProps.layers[j].name !== this.props.layers[j].name ||
          nextProps.layers[j].service !== this.props.layers[j].service) {
        return true;
      }
    }
    // console.log('No shouldComponentUpdate');
    return false;
  }

  componentDidUpdate (nextProps) {
    // console.log('componentDidUpdate');
    if (this.props.layers.length) {
      this.webMapJS.removeAllLayers();
      for (let j = 0;j < this.props.layers.length; j++) {
        this.webMapJS.addLayer(this.props.layers[j]);
        // console.log('add layer ok', this.props.layers[j].name);
        if (this.props.layerReadyCallback) {
          this.props.layers[j].parseLayer(
            (wmjsLayer) => {
              console.log('ReactWebMapJS layerReadyCallback');
              this.props.layerReadyCallback(wmjsLayer, this.webMapJS);
            },
            undefined, 'ReactWebMapJS::componentDidUpdate');
        }
      }
      this.webMapJS.draw();
    }
  }
  componentDidMount () {
    // console.log('componentDidMount');
    if (this.webMapJSCreated) {
      // console.log('ret');
      // this.webMapJS.draw();
      return;
    }
    this.webMapJSCreated = true;
    this.webMapJS = new WMJSMap(this.refs.adagucwebmapjs);
    this.webMapJS.setBaseURL('./adagucwebmapjs/');
    this.webMapJS.setProjection({ srs:this.props.srs || 'EPSG:3857', bbox:this.props.bbox || [-19000000, -19000000, 19000000, 19000000] });
    this.webMapJS.setWMJSTileRendererTileSettings(WMJSTileRendererTileSettings);
    let baselayers = [
      // new WMJSLayer({ 'name': 'OSM', type: 'twms' }),
      new WMJSLayer({
        service: config.backendHost + '/wms?dataset=baselayers&',
        name:'baselayer',
        format:'image/png',
        title:'Basemap',
        enabled: true,
        keepOnTop:false
      }),
      new WMJSLayer({
        service: config.backendHost + '/wms?dataset=baselayers&',
        name:'overlay',
        format:'image/png',
        title:'World country borders',
        enabled: true,
        keepOnTop:true
      })
    ];

    if (this.props.baselayers) {
      baselayers = this.props.baselayers;
    }

    this.webMapJS.setBaseLayers(baselayers);

    // console.log(this.props.listeners);
    if (this.props.listeners) {
      this.props.listeners.forEach((listener) => {
        console.log('setting listeners');
        this.webMapJS.addListener(listener.name, (data) => { listener.callbackfunction(this.webMapJS, data); }, listener.keep);
      });
    }

    this.resize();
    this.componentDidUpdate();
    this.webMapJS.draw();
    window.addEventListener('resize', this._handleWindowResize);

    if (this.props.webMapJSInitializedCallback && this.webMapJS) {
      console.log('ReactWebMapJS webMapJSInitializedCallback');
      this.props.webMapJSInitializedCallback(this.webMapJS, true);
    }
  }

  componentWillUnmount () {

    window.removeEventListener('resize', this._handleWindowResize);
    if (this.props.webMapJSInitializedCallback && this.props.layers && this.props.layers.length > 0) {
      this.props.webMapJSInitializedCallback(this.webMapJS, false);
    }
  }
  resize () {
    const element = this.refs.adaguccontainer;
    if (element) {
      this.webMapJS.setSize(element.clientWidth, element.clientHeight);
    }
  }
  render () {
    // console.log('ReactWebMapJS Render');
    if (this.container) {
      this.width = parseInt(this.container.clientWidth);
      this.height = parseInt(this.container.clientHeight);
    }
    return (<div className='ReactWebMapJS' ref={(container) => { this.container = container; }}
      style={{ height:'100%', width:'100%', border:'none', display:'block', overflow:'hidden' }} >
      <div ref='adaguccontainer' style={{
        minWidth:'inherit',
        minHeight:'inherit',
        width: 'inherit',
        height: 'inherit',
        overflow: 'hidden',
        display:'block',
        border: 'none'
      }}>
        <div style={{ overflow: 'visible' }} >
          <div ref='adagucwebmapjs' />
        </div>
      </div>
    </div>);
  }
};
ReactWebMapJS.propTypes = {
  layers: PropTypes.array,
  baselayers: PropTypes.array,
  listeners: PropTypes.array,
  bbox: PropTypes.object,
  webMapJSInitializedCallback: PropTypes.func,
  layerReadyCallback: PropTypes.func,
  srs: PropTypes.string
};
