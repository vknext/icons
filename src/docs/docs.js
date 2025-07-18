import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { aliases } from './aliases.js';
import { HuePicker as Hue } from 'react-color';
import './docs.css';
import * as allIcons from '../../dist/index.js';

const Icons = {};

window.ICONS.forEach(({ dirname, id, componentName, deprecated }) => {
  if (!Icons.hasOwnProperty(dirname)) {
    Icons[dirname] = {};
  }

  if (!deprecated) {
    Icons[dirname][id] = {
      Icon: allIcons[componentName],
      componentName,
    };
  }
});

const example = `import { Icon24Cancel } from '@vknext/icons';

<Icon24Cancel />`;

const sizeExample = `<Icon24LogoVk width={20} height={20} />`;

class Docs extends React.PureComponent {
  constructor(props) {
    super(props);
    const [anchorSize, anchorName] = window.location.hash.replace('#', '').split('/');
    this.state = {
      currentColor: 'rgb(0, 140, 255)',
      selectedIcon: '',
      copied: false,
      anchorSize,
      anchorName,
      search: '',
      exactMatchSearch: false,
    };
  }

  onCurrentColorChange = (color) => this.setState({ currentColor: color.hex });

  onSearchChange = (e) => this.setState({ search: e.target.value });

  onSearchModeChange = (e) => this.setState({ exactMatchSearch: e.target.checked });

  onTextareaChange = () => this.setState({ selectedIcon: null });

  onIconClick = (e) => {
    const { name, size, component } = e.currentTarget.dataset;
    this.setState(
      {
        selectedIcon: component,
        anchorSize: size,
        anchorName: name,
      },
      () => {
        this.textareaEl.select();
        document.execCommand('copy');
        this.setState({ copied: true }, () => {
          this.copiedEl.addEventListener('animationend', () => {
            this.setState({ copied: false });
          });
        });
      },
    );
  };

  getTextareaEl = (el) => (this.textareaEl = el);

  getCopiedEl = (el) => (this.copiedEl = el);

  isAnchor(size, name) {
    return size === this.state.anchorSize && name === this.state.anchorName;
  }

  render() {
    return (
      <div className="root">
        <h1>VK Icons</h1>
        <p>Набор SVG иконок, представленный в виде React компонентов.</p>
        <ul>
          <li>
            <a href="https://github.com/vknext/icons">Github</a>
          </li>
          <li>
            <a href="https://npmjs.com/package/@vknext/icons">npm</a>
          </li>
        </ul>
        <h2>Установка</h2>
        <pre>yarn add @vknext/icons</pre>
        <h2>Пример</h2>
        <pre>{example}</pre>
        <h2>Кастомные размеры</h2>
        <p>
          Иногда может потребоваться установить для иконки другой размер. Для этого можно передать
          свойства <code>width</code> и <code>height</code>, ширина и высота в пикселях.{' '}
          <b>Они должны быть числовыми значениями.</b>
        </p>
        <pre>{sizeExample}</pre>
        <h2>Стилизация</h2>
        <div className="color">
          <p>
            Иконки можно красить. Для этого к элементу <code>svg</code> применено правило{' '}
            <code>fill: currentColor</code>. Иными словами, цвет иконки соответствует текущему
            значению свойства <code>color</code>.
          </p>
          <div className="color-picker">
            <Hue
              color={this.state.currentColor}
              onChange={this.onCurrentColorChange}
              width="100%"
            />
          </div>
        </div>
        <h2>
          <input
            placeholder="поиск"
            autoFocus={true}
            type="text"
            onChange={this.onSearchChange}
            value={this.state.search}
          />
        </h2>
        <h2>
          <input
            type="checkbox"
            id="search-mode"
            onChange={this.onSearchModeChange}
            checked={this.state.exactMatchSearch}
          />
          <label htmlFor="search-mode">Точное совпадение</label>
        </h2>
        {Object.keys(Icons).map((size) => (
          <div key={size} className="size">
            <h3>{size}</h3>
            <div className="icons" style={{ color: this.state.currentColor }}>
              {Object.keys(Icons[size])
                .filter(
                  (iconName) =>
                    iconName.indexOf(this.state.search) > -1 ||
                    (!this.state.exactMatchSearch &&
                      aliases[iconName.replace('_outline', '')]?.findIndex((alias) =>
                        alias.includes(this.state.search),
                      ) > -1),
                )
                .map((iconName) => {
                  const { Icon, componentName } = Icons[size][iconName];
                  return (
                    <a
                      href={`#${size}/${iconName}`}
                      className={`icon ${this.isAnchor(size, iconName) ? 'icon--anchor' : ''}`}
                      style={{ width: `${size}px`, height: `${size}px`, color: 'inherit' }}
                      key={iconName}
                      onClick={this.onIconClick}
                      data-name={iconName}
                      data-size={size}
                      data-component={componentName}
                    >
                      <Icon />
                      <div className="icon-name">{iconName}</div>
                    </a>
                  );
                })}
            </div>
          </div>
        ))}
        <textarea
          ref={this.getTextareaEl}
          value={this.state.selectedIcon}
          onChange={this.onTextareaChange}
        />
        {this.state.copied && (
          <div className="copied" ref={this.getCopiedEl}>
            скопировано
          </div>
        )}
      </div>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<Docs />);
