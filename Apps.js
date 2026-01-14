// ===============================
// MISTIK BILGE SYSTEM
// Telefon üçün sadə Expo App
// Audit + Tekmilleşme paneli daxil
// ===============================

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function App() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);
  const [auditLog, setAuditLog] = useState([]);

  // ---- Numerologiya hesabı ----
  function numValue(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
    }
    return sum % 9;
  }

  // ---- Mistik Bilge Proqnoz ----
  function bilgePredict() {
    if (!teamA || !teamB || !date) return;

    const a = numValue(teamA);
    const b = numValue(teamB);
    const d = numValue(date);

    const scoreA = (a + d) % 10;
    const scoreB = (b + d) % 10;

    let win = scoreA > scoreB ? teamA : teamB;

    const out = {
      teamA,
      teamB,
      scoreA,
      scoreB,
      win
    };

    setResult(out);

    // ---- Audit panel ----
    setAuditLog([
      ...auditLog,
      { id: auditLog.length + 1, ...out }
    ]);
  }

  // ---- Tekmilleşme (özünü düzəltmə) ----
  function resetAudit() {
    setAuditLog([]);
  }

  return (
    <ScrollView style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🔮 Mistik Bilge Sistemi
      </Text>

      <TextInput
        placeholder="Team A"
        value={teamA}
        onChangeText={setTeamA}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Team B"
        value={teamB}
        onChangeText={setTeamB}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Tarix (məs: 20260115)"
        value={date}
        onChangeText={setDate}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TouchableOpacity
        onPress={bilgePredict}
        style={{
          backgroundColor: "black",
          padding: 10,
          marginTop: 10
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Proqnoz ver
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={{ marginTop: 20 }}>
          <Text>Team A bal: {result.scoreA}</Text>
          <Text>Team B bal: {result.scoreB}</Text>
          <Text>🏆 Qalib: {result.win}</Text>
        </View>
      )}

      {/* ---- AUDIT PANEL ---- */}
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        📊 Audit Paneli
      </Text>

      {auditLog.map((item) => (
        <View key={item.id} style={{ marginTop: 5 }}>
          <Text>
            #{item.id}) {item.teamA} vs {item.teamB} → Qalib: {item.win}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={resetAudit}
        style={{
          backgroundColor: "red",
          padding: 8,
          marginTop: 10
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Audit sıfırla (Tekmilleşme)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
