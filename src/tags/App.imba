import { parse } from '../htmlparser.js'

export tag App
  def onClick
    @output = await parse @input
  
  def render
    <self>
      <p> 'This will convert HTML into Imba. Paste it here:'
      <div.t :change.onClick>
        <textarea[@input]>
      <div.t>
        <textarea[@output]>