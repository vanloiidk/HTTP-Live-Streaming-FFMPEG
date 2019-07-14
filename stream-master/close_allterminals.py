#!/usr/bin/env python3
import subprocess
import time

def get_res():
    # get resolution
    xr = subprocess.check_output(["xrandr"]).decode("utf-8").split()
    pos = xr.index("current")
    return [int(xr[pos+1]), int(xr[pos+3].replace(",", "") )]

try:
    pid = subprocess.check_output(["pidof", "gnome-terminal"]).decode("utf-8").strip()
except:
    pass
else:
    res = get_res()
    ws = subprocess.check_output(["wmctrl", "-lpG"]).decode("utf-8").splitlines()
    for t in [w for w in ws if pid in w]:
        window = t.split()
        if all([0 < int(window[3]) < res[0], 0 < int(window[4]) < res[1]]) :
            w_id = window[0]    
            subprocess.Popen(["wmctrl", "-ia", w_id])
            subprocess.call(["xdotool", "key", "Ctrl+Shift+Q"])
            time.sleep(0.2)
