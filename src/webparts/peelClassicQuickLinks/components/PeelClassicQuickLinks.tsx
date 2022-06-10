import * as React from 'react';
import styles from './PeelClassicQuickLinks.module.scss';
import { IPeelClassicQuickLinksProps } from './IPeelClassicQuickLinksProps';
import { getQuickLinks } from '../Services/DataRequests';
import { TextField } from 'office-ui-fabric-react';
import ILinks  from './ILinks/ILinks';

export default function PeelClassicQuickLinks (props: IPeelClassicQuickLinksProps) {

  const [quickLinks, setQuickLinks] = React.useState([]);
  const [searchTxt, setSearchTxt] = React.useState('');

  React.useEffect(()=>{
    getQuickLinks(props.context).then(results => {
      console.log("state results", results);
      setQuickLinks(results);
    });
  }, []);


    return (
      <div className={ styles.peelClassicQuickLinks }>
        <div className={styles.linksHdrOps}>
          <TextField
            onChange={(_: any, text: string) => setSearchTxt(text)}
            className={styles.linksHdrTxt}
            label={props.wpTitle}
            underlined
            placeholder='Search'
            value={searchTxt}
          />
        </div>

        <ILinks
          linksTitle={props.wpTitle}
          linksItems={quickLinks}
          searchTxt = {searchTxt}
        />
      </div>
    );
  
}
