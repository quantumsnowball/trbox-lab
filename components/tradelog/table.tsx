import { OrderResult, TaggedMessage, TradeLog, WebSocketMessage } from './../../common/types';
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material'
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { contentTempActions } from '@/redux/slices/contentTemp';
import { PORT_WS } from '@/common/constants';
import { useRouter } from 'next/router';


// connect to ws

export default function TradeLogTable() {
  const router = useRouter()
  const dispatch = useDispatch()
  const socket = useRef(null as WebSocket | null)
  const [tradelog, addOrderResult, setTradeLog, clearTradeLog] = [
    useSelector((s: RootState) => s.contentTemp.tradelog),
    (r: OrderResult) => dispatch(contentTempActions.addOrderResult(r)),
    (l: TradeLog) => dispatch(contentTempActions.setTradeLog(l)),
    () => dispatch(contentTempActions.clearTradeLog()),
  ]

  // when page navigate away
  const onPageLeave = (url: string) => {
    // only when leave from /tradelog
    if (url !== '/tradelog') {
      socket.current?.close()
      console.debug('ws disconnected')
      clearTradeLog()
    }
  }

  // when page enter into
  const onPageEnter = () => {
    // when enter pae /tradelog
    if (router.pathname !== '/tradelog')
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
      socket.current?.send('TradeLogHistoryRequest')
    })
    // start to listen to message 
    socket.current.addEventListener('message', (e: MessageEvent<string>) => {
      const msg: WebSocketMessage = JSON.parse(e.data)
      if (msg.tag === 'OrderResult') {
        const { data: orderResult } = msg as TaggedMessage<OrderResult>
        addOrderResult(orderResult)
        console.debug(msg.tag)
      }
      else if (msg.tag === 'TradeLogHistory') {
        const { data: tradeLogHistory } = msg as TaggedMessage<TradeLog>
        console.debug(`tradelog history length: ${tradeLogHistory.length}`)
        setTradeLog(tradeLogHistory)
      }
    })
    // when comp mounted
    router.events.on('routeChangeStart', onPageLeave)
    console.debug('listening page leave event')
  }

  // when page enter
  useEffect(() => {
    // when mounted
    onPageEnter()

    // when unmounted/refresh/exit
    return () => {
      // socketRef.current?.close()
      // router.events.off('routeChangeStart', on_routeChange)
      // BUG these cause problem when in react strict mode
      console.debug('unmounted/refresh/exit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradelog.map(({ timestamp, symbol, action, price, quantity }) => (
            <TableRow
              key={timestamp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {timestamp} </TableCell>
              <TableCell align="right">{symbol}</TableCell>
              <TableCell align="right">{action}</TableCell>
              <TableCell align="right">{price}</TableCell>
              <TableCell align="right">{quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}



