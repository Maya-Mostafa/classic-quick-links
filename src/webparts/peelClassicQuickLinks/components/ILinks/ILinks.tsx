import * as React from "react";
import ILinksProps from "./ILinksProps";
import styles from '../PeelClassicQuickLinks.module.scss';
import { LinkItem } from "../../interfaces/LinkItem";

export default function ILinks(props: ILinksProps) {

    const filteredLinkItems = 
                            props.searchTxt ? 
                                (props.linksItems ? props.linksItems.filter(item => item.Name.toLowerCase().indexOf(props.searchTxt) >= 0) : []) 
                            : props.linksItems;

	return (
        <div className={styles.linkCntnr}>
            {filteredLinkItems.map((linkItem: LinkItem) => {
                return(
                    <div className={styles.toggleNdTxt} key={linkItem.ID}>
                        <a 
                            className={styles.linkChk}
                            key={linkItem.ID} 
                            target='_blank'
                            data-interception="off"
                            href={linkItem.Url}>
                            {linkItem.Name}
                        </a>
                    </div>
                );
            })}
        </div>
	);
}
