# Blueprint for Trello

### Making it a little easier to use Trello in service design
Hi there, Michael here. This is a simple browser extension in progress that
adds color coding and icons to cards used in service design
consistent with the look and feel established by Megan Miller and Erik Flowers
for their [practical service blueprint](http://www.practicalservicedesign.com/the-guide).

![A screenshot of a color-coded list](/images/screenshot.png?raw=true)

## Use
This extension isn't quite ready for prime time but if you're interested in
messing around you will need to visit `chrome://extensions` and toggle
developer mode, clone or download and unpack this repository locally, then
select the folder `blueprint-for-trello` as an extension.

### Layers
You can designate any card as a layer of the blueprint by writing the type
of layer within brackets in the title of the card. e.g., `[actor] Michael Schofield`.

#### Types of layers
* [touchpoint]
* [actor]
* [system]
* [stakeholder]
* [observation]
* [data]
* [question]
* [critical]
* [idea]

### Um, refresh
Right now the script only runs on page load, so you'll need to refresh. I wanted
to commit something before time got away from me, thus the < 1.0 designation
in the manifest.
