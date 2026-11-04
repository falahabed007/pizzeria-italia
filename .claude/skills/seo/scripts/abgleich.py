#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Artefakt-Abgleich für docs/seo/ — zählt, was die Dateien behaupten, gegen das, was drinsteht.

Aufruf:  python3 .claude/skills/seo/scripts/abgleich.py [pfad/zu/docs/seo]
Exit 0 = alles stimmt · Exit 1 = mindestens ein ✗. Keine KI, keine Abfrage — nur zählen.
"""
import io, os, re, sys, glob

D = sys.argv[1] if len(sys.argv) > 1 else "docs/seo"
fehler = 0

def rows(text, start=None, end=None):
    seg = text
    if start and start in text:
        seg = text[text.index(start):]
        if end and end in seg: seg = seg[:seg.index(end)]
    return [l for l in seg.splitlines() if l.startswith("| ") and not re.match(r"^\| *-", l)
            and not re.match(r"^\| *(Keyword|Grund|Seite|Cluster|#|Station|Datum|Kategorie|Service|Wettbewerber|Kandidat|Befund|Fund|Maßnahme|Datei) *\|", l)]

def ok(cond, text):
    global fehler
    print(("  ✓ " if cond else "  ✗ ") + text)
    if not cond: fehler += 1

def lese(name):
    p = os.path.join(D, name)
    return io.open(p, encoding="utf-8").read() if os.path.exists(p) else None

print(f"Artefakt-Abgleich · {D}")

# Stationsstatus aus PIPELINE.md — geprüft wird nur, was als erledigt gemeldet ist
STATUS = {}
NOTE = {}
_pl = lese("PIPELINE.md")
if _pl:
    for l in _pl.splitlines():
        if l.startswith("| "):
            c = [x.strip() for x in l.split("|")[1:-1]]
            if len(c) >= 4: STATUS[c[0]] = c[3].lower(); NOTE[c[0]] = c[5] if len(c) > 5 else ""
def erledigt(nr): return "erledigt" in STATUS.get(str(nr), "")

# ── KEYWORDS.md
k = lese("KEYWORDS.md")
if k and erledigt(2):
    print("KEYWORDS.md")
    m = re.search(r"Keywords gesamt:\*\* (\d+)", k)
    db = rows(k, "## Die Datenbank", "## Streichliste")
    if m:
        ok(int(m.group(1)) == len(db), f"Überblick sagt {m.group(1)} Keywords — Datenbank-Tabelle hat {len(db)} Zeilen")
    else:
        ok(False, "kein „Keywords gesamt“ im Überblick")
    ok("## Streichliste" in k, "Streichliste vorhanden")
    if "## Streichliste" in k:
        sl = [l for l in rows(k, "## Streichliste") if l.count("|") >= 4]
        ohne = [l for l in sl if l.split("|")[3].strip() in ("", "—", "-")]
        ok(not ohne, f"Streichliste: {len(sl)} Zeilen, {len(ohne)} ohne Grund")
    ok("Ziel-Seite" in k, "Spalte Ziel-Seite vorhanden (leer bis Station 4 ist richtig)")
    ok(bool(re.search(r"SISTRIX-Abfragen[^\n]*\d", k)), "Überblick nennt die verbrauchten SISTRIX-Abfragen")
    hk = glob.glob(os.path.join(D, "daten", "**", "HERKUNFT.md"), recursive=True)
    ok(bool(hk), "daten/…/HERKUNFT.md vorhanden (Rohabzug mit Herkunft)")
    _cl = [l.split("|")[2].strip() for l in db if l.count("|") >= 3]
    _cl = [x for x in _cl if x]
    mc = re.search(r"\*\*Cluster:\*\* (\d+)", k)
    if mc:
        ok(int(mc.group(1)) >= len(set(_cl)), f"Überblick sagt {mc.group(1)} Cluster — Datenbank nutzt {len(set(_cl))}")
    if _cl:
        from collections import Counter
        top, n = Counter(_cl).most_common(1)[0]
        anteil = n / len(_cl)
        # Warnung, kein Fehler: ein Sammelkorb ist ein Qualitätsbefund, kein Zählfehler
        print(("  ✓ " if anteil <= 0.4 else "  ⚠ ") + f"größtes Cluster „{top}“: {n} von {len(_cl)} Zeilen ({anteil:.0%}) — über 40 % ist ein Sammelkorb, nach Leistung teilen")
        klein = [f"{c} ({m})" for c, m in Counter(_cl).items() if m < 10]
        print(("  ✓ " if not klein else "  ⚠ ") + (f"Cluster unter 10 Zeilen: {', '.join(klein)} — Seed trug vermutlich den Ort, nackt nachfahren (0 Abfragen)" if klein else "kein Cluster unter 10 Zeilen"))
elif erledigt(2):
    print("KEYWORDS.md fehlt"); fehler += 1

# ── CLUSTER-MAP.md ↔ KEYWORDS.md
c = lese("CLUSTER-MAP.md")
if c and k and erledigt(2):
    print("CLUSTER-MAP.md")
    kcl = set(re.findall(r"\| (\d+ [A-ZÄÖÜ][\wäöü-]*) \|", k))
    fehlt = [x for x in sorted(kcl, key=lambda s: int(s.split()[0])) if x.split()[0] not in c and x not in c]
    ok(not fehlt, f"jedes Cluster aus KEYWORDS.md kommt vor — fehlt: {fehlt or '—'}")

# ── MAPS-PLAN.md
mp = lese("MAPS-PLAN.md")
if mp and erledigt(3):
    print("MAPS-PLAN.md")
    kat = rows(mp, "## Kategorien", "## Services")
    ok(len(kat) >= 8, f"{len(kat)} Kategorie-Zeilen (Zielgröße ≥ 8, inkl. aussortierte)")
    ok(bool(re.search(r"Haupt", mp)), "eine Hauptkategorie benannt")
    ok(bool(re.search(r"aussortiert|Aussortiert|raus", mp)), "aussortierte Kandidaten mit Grund dokumentiert")

# ── SEITENBAUM.md ↔ CLUSTER-MAP.md
sb = lese("SEITENBAUM.md")
if sb and erledigt(4) and c:
    print("SEITENBAUM.md")
    ok(bool(re.search(r"beide Richtungen|Gegenprüfung", sb)), "Gegenprüfung in beide Richtungen dokumentiert")
    _sz = re.search(r"^## (\d+) Seiten wollen", sb, re.M) or re.search(r"\*\*(\d+) Seiten(?: gesamt)?[:\*]", sb)
    _pz = re.search(r"\*\*(\d+) Seiten\*\*", NOTE.get("4", "")) or re.search(r"(\d+) Seiten", NOTE.get("4", ""))
    if _sz and _pz:
        ok(_sz.group(1) == _pz.group(1), f"SEITENBAUM sagt {_sz.group(1)} Seiten — PIPELINE-Notiz Station 4 sagt {_pz.group(1)}")
    elif _sz:
        ok(False, f"SEITENBAUM sagt {_sz.group(1)} Seiten — PIPELINE-Notiz Station 4 nennt keine Seitenzahl")
    ok("Cluster ohne Seite" in c or "Content-Lücke" in c, "CLUSTER-MAP nennt Cluster ohne Seite (oder explizit keine)")

# ── KONKURRENZ.md
kk = lese("KONKURRENZ.md")
if kk and STATUS.get("—","").strip() not in ("", "offen"):
    print("KONKURRENZ.md")
    gap = rows(kk, "Lücken", None)
    ok(len(gap) >= 10, f"{len(gap)} Gap-Zeilen (Zielgröße 15)")
    ok("Entscheidung" in kk, "Spalte Entscheidung vorhanden")

# ── RANKING-LOG.md
rl = lese("RANKING-LOG.md")
if rl and erledigt(10):
    print("RANKING-LOG.md")
    dated = [l for l in rows(rl) if re.search(r"\d{4}-\d{2}-\d{2}", l)]
    ok(len(dated) >= 8, f"{len(dated)} datierte Zeilen (eine je Cluster-Kopf)")

# ── OFFPAGE.md
op = lese("OFFPAGE.md")
if op and erledigt(11):
    print("OFFPAGE.md")
    kand = rows(op, "Kandidat", None)
    ok(len(kand) >= 12, f"{len(kand)} Kandidaten-Zeilen (Zielgröße 20)")

# ── PIPELINE.md: kein „erledigt“ ohne Zahl in der Notiz
pl = lese("PIPELINE.md")
if pl:
    print("PIPELINE.md")
    for l in pl.splitlines():
        if l.startswith("| ") and "erledigt" in l:
            nr = l.split("|")[1].strip(); note = l.split("|")[-2]
            if nr in ("2","3","4","5","9","10","11","12"):
                ok(bool(re.search(r"\d", note)), f"Station {nr} erledigt — Notiz nennt die Zahl des Artefakts")

print("\nERGEBNIS:", "alles stimmt" if not fehler else f"{fehler} Abweichung(en) — Datei vervollständigen, nicht die Zahl anpassen")
sys.exit(1 if fehler else 0)
