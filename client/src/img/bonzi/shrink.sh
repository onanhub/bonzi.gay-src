#!/bin/bash

#colors=(orange)
imgs=(gray)

# for color in ${colors[*]}; do
#     convert $color.png -crop 200x160 +repage tmp%d.png
#     montage -tile 12x tmp0.png tmp{277..302}.png tmp{16..39}.png tmp{40..86}.png tmp{108..125}.png tmp{159..163}.png tmp{182..189}.png tmp{331..343}.png -geometry +0+0 -background none -define webp:lossless=true $color.webp
# done
# rm tmp*

for img in ${imgs[*]}; do
   convert $img.webp -coalesce -repage 0x0 -crop 50x50+76+39 +repage -define webp:lossless=true ../pfp/${img%.*}.webp
done