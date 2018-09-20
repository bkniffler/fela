import 'raf/polyfill'
import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'

import FelaThemeFactory from '../FelaThemeFactory'
import FelaComponentFactory from '../FelaComponentFactory'
import { THEME_CHANNEL } from '../themeChannel'

import createSnapshot from '../__helpers__/createSnapshot'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

const FelaComponent = FelaComponentFactory(createElement, FelaTheme, {
  [THEME_CHANNEL]: PropTypes.object,
  renderer: PropTypes.object,
})

describe('Using the FelaComponent component', () => {
  it('should correctly render a fela rule', () => {
    expect(
      createSnapshot(
        <FelaComponent
          style={{
            fontSize: '12px',
            color: 'red',
          }}>
          {({ className }) => (
            <div className={className}>I am red and written in 12px.</div>
          )}
        </FelaComponent>
      )
    ).toMatchSnapshot()
  })

  it('should correctly pass the theme and other props to functional style', () => {
    const rule = ({ theme, bgc }) => ({
      fontSize: theme.fontSize,
      backgroundColor: bgc || 'red',
    })

    expect(
      createSnapshot(
        <FelaComponent style={rule} bgc="blue">
          {({ className, theme }) => (
            <div className={className}>
              I am red and written in {theme.fontSize}.
            </div>
          )}
        </FelaComponent>,
        { fontSize: '15px' }
      )
    ).toMatchSnapshot()
  })

  it('should default to a div', () => {
    expect(
      createSnapshot(
        <FelaComponent
          style={{
            fontSize: '12px',
            color: 'red',
          }}
        />
      )
    ).toMatchSnapshot()
  })

  it('should render children in default mode', () => {
    expect(
      createSnapshot(
        <FelaComponent
          style={{
            fontSize: '12px',
            color: 'red',
          }}>
          <span>Hello World</span>
        </FelaComponent>
      )
    ).toMatchSnapshot()
  })

  it('should accept a string primitive type via as-prop', () => {
    expect(
      createSnapshot(
        <FelaComponent
          as="span"
          style={{
            fontSize: '12px',
            color: 'red',
          }}
        />
      )
    ).toMatchSnapshot()
  })

  it('should render children using the correct as-prop', () => {
    expect(
      createSnapshot(
        <FelaComponent
          as="h1"
          style={{
            fontSize: '12px',
            color: 'red',
          }}>
          Hello World
        </FelaComponent>
      )
    ).toMatchSnapshot()
  })
})
