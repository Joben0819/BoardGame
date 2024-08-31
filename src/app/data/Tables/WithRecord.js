import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AlertContainer from '../../components/Modal/AlertContainer';

export const WithRecord = [
  {
    Header: 'a',
    accessor: 'requestTime', //name
    Cell: ({ value }) => {
      return <span className='textcolor75'>{value}</span>;
    },
  },
  {
    Header: 'v',
    accessor: 'orderNo', //codeAmount
    Cell: ({ value }) => {
      const [copy, setCopy] = useState(false);

      return (
        <>
          {copy && (
            <AlertContainer
              setCopy={setCopy}
              alertMe={copy}
              padding={0}
              top={0}
              left={2.28}
              spanMarg={'0.15rem'}
              notify={value}
            />
          )}

          <CopyToClipboard
            text={value}
            onCopy={() => {
              setCopy(true);
            }}
          >
            <span className='orderNo_value'>
              <span>{value}</span>
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.03rem',
                  fontSize: '0.07rem',
                }}
                className='copyOrder_button'
              >
                <span
                  style={{
                    fontSize: '0.09rem',
                    lineHeight: '0.09rem',
                  }}
                >
                  复制
                </span>
              </div>
            </span>
          </CopyToClipboard>
        </>
      );
    },
  },
  {
    Header: 'c',
    accessor: 'remark', //rateclean
    Cell: ({ value }) => {
      return (
        <>
          {(() => {
            if (value.includes('提现成功') || value.includes('代付成功')) {
              return <span className={'textcolorgreen'}>提现成功</span>;
            } else if (value.includes('提现中')) {
              return <span className={'textcoloryellow'}>提现中</span>;
            } else {
              return <span className={'textcolorred'}>{value}</span>;
            }
          })()}
        </>
      );
    },
  },
  {
    Header: 'd',
    accessor: 'money', //cleanAmount,
    // Cell: ({value}) => {return parseFloat(value).toFixed(2) }
  },
];
