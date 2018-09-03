import React from 'react';

const optsDetails = ['radius', 'gradient', 'opacity', 'zooms'];

class Heatmap extends React.Component {
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        throw new Error('Heatmap has to be a child of Map component');
      } else {
        this.map = props.__map__;
        this.element = props.__ele__;
        this.resolveHeatmap(props).then(() => {
          this.triggerCreated(props);
          // if visible is set to false on created, hide it
          if (typeof props.visible === 'boolean' && !props.visible) {
            this.heatmap.hide();
          }
          if ('dataSet' in props) {
            this.createAMap(props.dataSet, props.mapType);
          }
        });
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    // compare nextProp and this.props determine
    // specify prop need to be refresh
    // alse, assure heatmap is loaded
    const currentProps = this.props;
    this.resolveHeatmap().then(() => {
      this.refreshHeatmap(nextProps, currentProps);
    });
  }

  resolveHeatmap(props) {
    if (this.heatmap) {
      return new Promise((resolve) => {
        resolve(this.heatmap);
      });
    } else {
      return new Promise((resolve) => {
        this.map.plugin(['AMap.Heatmap'], () => {
          const heatmapOptions = this.buildInitOptions(props);
          this.heatmap = new window.AMap.Heatmap(this.map, heatmapOptions);
          resolve(this.heatmap);
        });
      });
    }
  }

  // 其他经纬度坐标转换后再构建热力图
  createAMap(dataSet, mapType = '') {
    const mapTypes = ['baidu', 'gps', 'mapbar'];
    if (mapTypes.indexOf(mapType) === -1) {
      this.heatmap.setDataSet(dataSet);
      return;
    }
    const points = dataSet.data.map((item) => {
      return new AMap.LngLat(item.lng, item.lat);
    });

    AMap.convertFrom(points, mapType, function(status, result) {
      if (result.info === 'ok') {
        var lnglats = result.locations;
        const rData = lnglats.map((item, index) => {
          return {
            ...dataSet.data[index],
            lng: item.getLng(),
            lat: item.getLat()
          };
        });
        this.heatmap.setDataSet({
          ...dataSet,
          data: rData
        });
      }
    });
  }

  triggerCreated(props) {
    const events = props.events || {};
    if ('created' in events && typeof events.created === 'function') {
      events.created(this.heatmap);
    }
  }

  buildInitOptions(props) {
    const opts = {};
    optsDetails.forEach((key) => {
      if (key in props) {
        opts[key] = props[key];
      }
    });
    return opts;
  }

  refreshHeatmap(nextProps, currentProps) {
    if ('visible' in nextProps) {
      if (nextProps.visible) {
        this.heatmap.show();
      } else {
        this.heatmap.hide();
      }
    }

    const opts = {};
    let optsRefresh = false;
    optsDetails.forEach((key) => {
      if (nextProps[key] !== currentProps[key]) {
        optsRefresh = true;
        opts[key] = nextProps[key];
      }
    });
    if (optsRefresh) {
      this.heatmap.setOptions(opts);
    }

    if (nextProps.dataSet !== currentProps.dataSet) {
      this.createAMap(nextProps.dataSet);
    }
  }

  render() {
    return null;
  }

  componentWillUnmount() {
    this.heatmap.hide();
    this.heatmap.setMap(null);
    delete this.heatmap;
  }
}

module.exports = Heatmap;
