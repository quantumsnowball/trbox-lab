import { PORT_WS } from '@/common/constants';
import { contentTempActions } from '@/redux/slices/contentTemp';
import { styled } from '@mui/material';
import {
  createChart,
  ColorType,
  SeriesDataItemTypeMap,
  SeriesType,
  ISeriesApi,
  IChartApi,
} from 'lightweight-charts';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { EquityCurve, EquityValue, TaggedMessage, WebSocketMessage } from '../../common/types'; // TODO


const ChartDiv = styled('div')`
  /* take all vertical space */
  margin: 5px;
`;

const LiveChart = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const socket = useRef(null as WebSocket | null)
  const ctnRef = useRef<HTMLDivElement | null>(null)
  const series = useRef<ISeriesApi<'Area'> | null>(null)
  const chart = useRef<IChartApi | null>(null)
  const initialData = useRef([
    // { time: '2018-12-30', value: 22.68 },
    // { time: '2018-12-31', value: 22.67 },
  ] as SeriesDataItemTypeMap[SeriesType][])

  // actions
  const setEquityValue = (v: number) => dispatch(contentTempActions.setEquityValue(v))

  // when data is being set
  const onDataReady = () => {
    // create chart only if not already exists
    if (chart.current)
      return
    // create chart
    chart.current = createChart(ctnRef?.current ? ctnRef.current : '',
      {
        layout: {
          background: {
            type: ColorType.Solid,
            color: 'white',
          },
          textColor: 'black',
        },
        width: ctnRef?.current?.clientWidth,
        height: 300,
      },
    );
    console.debug('chart created')
    // add data
    series.current = chart.current.addAreaSeries({
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)'
    });
    series.current.setData(initialData.current);
    chart.current.timeScale().fitContent();
    console.debug('data injected')
    // customization
    series.current.applyOptions({
      priceFormat: {
        type: 'volume',
        precision: 2
      }
    })
    // add event listener
    const handleResize = () => {
      chart.current?.applyOptions({
        width: ctnRef?.current?.clientWidth
      });
    };
    window.addEventListener('resize', handleResize);
    // clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.current?.remove();
      console.debug('chart removed')
    };
  }

  // when page navigate away
  const onPageLeave = (url: string) => {
    // only when leave from /navs
    if (url !== '/navs') {
      socket.current?.close()
      console.debug('ws disconnected')
    }
  }

  // when page enter into
  const onPageEnter = () => {
    // when enter pae /navs
    if (router.pathname !== '/navs')
      return
    // connect to socket if there is not already a connection
    if (socket.current) {
      console.debug('using existing socket')
      return
    }
    // create socket
    socket.current = new WebSocket(`ws://${window.location.hostname}:${PORT_WS}`)
    console.debug('ws connected')
    // request for history when connected
    socket.current.addEventListener('open', () => {
      socket.current?.send('EquityValueHistoryRequest')
    })
    // start to listen to message 
    socket.current.addEventListener('message', (e: MessageEvent<string>) => {
      const msg: WebSocketMessage = JSON.parse(e.data)
      if (msg.tag === 'EquityValue') {
        const { data: equityValue } = msg as TaggedMessage<EquityValue>
        console.debug(msg.tag)
        series.current?.update({
          time: equityValue.timestamp.split('T')[0],
          value: equityValue.equity
        })
        setEquityValue(equityValue.equity)
      } else if (msg.tag === 'EquityCurveHistory') {
        const { data: equityValueHistory } = msg as TaggedMessage<EquityCurve>
        console.debug(`equity curve history length: ${equityValueHistory.length}`)
        initialData.current = equityValueHistory.map(
          ({ timestamp, equity }) => ({
            time: timestamp.split('T')[0],
            value: equity
          }))
        onDataReady()
      }
    })
    // when comp mounted
    router.events.on('routeChangeStart', onPageLeave)
    console.debug('listening page leave event')
  }

  // after comp mount 
  useEffect(() => {
    // when mounted
    onPageEnter()
    // clean up
    return () => {
      console.debug('unmounted/refresh/exit')
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChartDiv ref={ctnRef} />
  );
};

export default LiveChart

