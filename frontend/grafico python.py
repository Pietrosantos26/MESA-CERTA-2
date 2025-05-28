import matplotlib.pyplot as plt

# Dados de feminicídios por ano no estado de São Paulo
anos = [2020, 2021, 2022, 2023, 2024]
casos = [136, 140, 195, 221, 250]  # Dados obtidos de fontes confiáveis

plt.figure(figsize=(10, 6))
plt.plot(anos, casos, marker='o', linestyle='-', color='crimson')
plt.title('Casos de Feminicídio no Estado de São Paulo (2020–2024)', fontsize=14)
plt.xlabel('Ano')
plt.ylabel('Número de Casos')
plt.grid(True, linestyle='--', alpha=0.5)
plt.xticks(anos)
plt.tight_layout()
plt.show()
