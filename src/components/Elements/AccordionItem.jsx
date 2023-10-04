import React from 'react';

class AccordionItem extends React.Component {
  state = {
    opened: false,
  };

  render() {
    const {
      props: { title, content },
      state: { opened },
    } = this;

    return (
      <div
        {...{
          className: `accordion-item, ${opened && 'accordion-item--opened'}`,
          onClick: () => {
            this.setState({ opened: !opened });
          },
        }}
      >
        <div {...{ className: 'accordion-item__line' }}>
          <h3 {...{ className: 'accordion-item__title' }}>{title}</h3>
          <span {...{ className: 'accordion-item__icon' }} />
        </div>
        <div {...{ className: 'accordion-item__inner' }}>
          <div {...{ className: 'accordion-item__content' }}>
            <p {...{ className: 'accordion-item__paragraph' }}>{content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AccordionItem;
