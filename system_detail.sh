 #!/bin/sh
 # -*- mode: sh -*-
     
YAD_OPTIONS="--window-icon='dialog-information' --name=Sysinfo"
     
KEY=$RANDOM
     
function show_mod_info 
	{
         TXT="\\n<span face='Monospace'>$(modinfo $1 | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span>"
         yad --title=$"Module information" --button="Đóng" --width=500 \
         --image="application-x-addon" --text="$TXT"
        }
export -f show_mod_info
    
# CPU tab
lscpu | sed -r "s/:[ ]*/\n/" |\
yad --plug=$KEY --tabnum=1 --image=cpu --text=$"Thông tin CPU" \
--list --no-selection --column=$"Thông số" --column=$"Giá trị" &
    
# Memory tab
sed -r "s/:[ ]*/\n/" /proc/meminfo |\
yad --plug=$KEY --tabnum=2 --image=memory --text=$"Thông tin bộ nhớ" \
--list --no-selection --column=$"Thông số" --column=$"Giá trị" &
    
# Harddrive tab
df -T | tail -n +2 | awk '{printf "%s\n%s\n%s\n%s\n%s\n%s\n", $1,$7, $2, $3, $4, $6}' |\
yad --plug=$KEY --tabnum=3 --image=drive-harddisk --text=$"Thông tin ổ cứng" \
--list --no-selection --column=$"Device" --column=$"Mountpoint" --column=$"Type" \
--column=$"Total:sz" --column=$"Free:sz" --column=$"Usage:bar" &
   
# PCI tab
lspci -vmm | sed 's/\&/\&amp;/g' | grep -E "^(Slot|Class|Vendor|Device|Rev):" | cut -f2 |\
yad --plug=$KEY --tabnum=4 --text=$"PCI bus" \
--list --no-selection --column=$"ID" --column=$"Class" \
--column=$"Vendor" --column=$"Device" --column=$"Rev" &
   
# Modules tab
awk '{printf "%s\n%s\n%s\n", $1, $3, $4}' /proc/modules | sed "s/[,-]$//" |\
yad --plug=$KEY --tabnum=5 --text=$"Kernel" \
--image="application-x-addon" --image-on-top \
--list --dclick-action='bash -c "show_mod_info %s"' \
--column=$"Name" --column=$"Used" --column=$"Depends" &
   
# Battery tab
( acpi -i ; acpi -a ) | sed -r "s/:[ ]*/\n/" | yad --plug=$KEY --tabnum=6 \
--image=battery --text=$"Battery state" --list --no-selection \
--column=$"Device" --column=$"Details" &
   
# main dialog
TXT=$"<b>17TCLC1 - Hệ điều hành Linux</b>\\n\\n"
TXT+=$"\\t Phiên bản OS: $(lsb_release -ds) on $(hostname)\\n"
TXT+=$"\\t Phiên bản Kernel: $(uname -sr)\\n\\n"
TXT+="\\t<i>$(uptime)</i>"
yad --notebook --width=600 --height=450 --title=$"Đọc thông tin hệ thống" --text="$TXT" --button="Đóng" \
--key=$KEY --tab=$"CPU" --tab=$"Memory" --tab=$"Disks" --tab=$"PCI" --tab=$"Modules" \
--tab=$"Battery" --active-tab=${1:-1}
