import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PeelClassicQuickLinksWebPartStrings';
import PeelClassicQuickLinks from './components/PeelClassicQuickLinks';
import { IPeelClassicQuickLinksProps } from './components/IPeelClassicQuickLinksProps';

export interface IPeelClassicQuickLinksWebPartProps {
  wpTitle: string;
}

export default class PeelClassicQuickLinksWebPart extends BaseClientSideWebPart<IPeelClassicQuickLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPeelClassicQuickLinksProps> = React.createElement(
      PeelClassicQuickLinks,
      {
        wpTitle: this.properties.wpTitle,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('wpTitle', {
                  label: 'Links Title',
                  value: this.properties.wpTitle,
                  description: 'e.g. My Quick Links - Classic'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
